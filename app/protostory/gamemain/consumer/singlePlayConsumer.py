# gamemain/consumers.py
import json
import redis
import logging
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from gamemain.consumer import responseFormatter
from gamemain.consumer.requestPatterns import RequestPatterns
from gamemain.consumer.SinglePlayModeAssets.EnemyMovements import tonnuraMoves
import gamemain.consumer.GameModeShareFunctions.CommonFunction as commonFunction
from portal.models import GameMatch

class SinglePlayConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        if self.scope["user"].is_authenticated:
            # Send message to WebSocket
            self.send(text_data=json.dumps({
                'message': "you are authenicated"
            }))
            logging.warning("signle play mode connected user name is "+self.scope["user"].username)
            self.initializeMatch(self.scope["user"].username)

    def receive(self, text_data=None, bytes_data=None):
        # Called with either text_data or bytes_data for each frame
        jsonData = json.loads(text_data)
        if 'message' not in jsonData:
            raise ValueError("recieved websocket request but message type was not set",jsonData)

        if jsonData['message']==RequestPatterns.TurnEnded.value:
            if 'cardData' not in jsonData:
                raise ValueError("recieved websocket request 'ActionDetermined' but cardList was not set",jsonData)
            logging.warning("cardData has been sent. user name is "+self.scope["user"].username)
            self.gotPlayerCardList(self.scope["user"].username,jsonData['cardData'])
            return

        if jsonData['message']==RequestPatterns.GameOver.value:
            self.send(responseFormatter.gamerOverResponse())
            return

        if jsonData['message']==RequestPatterns.GameChat.value:
            if 'chatMessage' not in jsonData:
                raise ValueError("recieved websocket request 'GameChat' but chatMessage was not set",jsonData)
            logging.warning("chatMessage has been sent. user name is "+self.scope["user"].username)
            self.gotChatMessage(self.scope["user"].username,jsonData['chatMessage'])
            return
        
        raise ValueError("recieved websocket request but message type is invalid",jsonData)

    def initializeMatch(self,userName):
        connection = redis.Redis(host='localhost', port=6379, db=0)
        connection.hset("siglePlayData"+userName, "sentCardCount",0)
        self.send(responseFormatter.gameStartResponse(userName,"トンヌラ"))

    def gotPlayerCardList(self,playerName,jsonCardList):
        connection = redis.Redis(host='localhost', port=6379, db=0)
        turn=connection.hget("siglePlayData"+playerName,"sentCardCount")
        jsonOpponentCardList=json.loads(tonnuraMoves[turn])
        commonFunction.sendMessageToUser(playerName,responseFormatter.actionDeterminedResponse("トンヌラ",jsonOpponentCardList))
        return

    def gotChatMessage(self,playerName,chatMessage):
        return

    def disconnect(self, close_code):
        self.close()
