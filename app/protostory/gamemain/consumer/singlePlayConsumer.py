# gamemain/consumers.py
import json
import redis
from channels.generic.websocket import WebsocketConsumer
from . import responseFormatter
from .requestPatterns import RequestPatterns

class SinglePlayConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        if not self.scope["user"].is_authenticated:
            # Send message to WebSocket
            self.send(text_data=json.dumps({
                'message': "you are authenicated"
            }))

    def receive(self, text_data=None, bytes_data=None):
        # Called with either text_data or bytes_data for each frame
        jsonData = json.loads(text_data)
        if 'message' not in jsonData:
            raise ValueError("recieved websocket request but message type was not set",jsonData)
        if jsonData['message']==RequestPatterns.GameStart.value:
            self.send(responseFormatter.gameStartResponse())
            return
        if jsonData['message']==RequestPatterns.TurnEnded.value:
            if 'cardData' not in jsonData:
                raise ValueError("recieved websocket request 'ActionDetermined' but cardList was not set",jsonData)
            self.send(responseFormatter.actionDeterminedResponse(jsonData['cardData']))
            return

        if jsonData['message']==RequestPatterns.GameOver.value:
            self.send(responseFormatter.gamerOverResponse())
            return
        raise ValueError("recieved websocket request but message type is invalid",jsonData)

    def disconnect(self, close_code):
        self.close()
