# gamemain/consumers.py
import json
import redis
import logging
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from gamemain.consumer import responseFormatter
from gamemain.consumer.requestPatterns import RequestPatterns
import gamemain.consumer.GameModeShareFunctions.CommonFunction as commonFunction
from portal.models import GameMatch


class StandardPlayConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        if self.scope["user"].is_authenticated:
            # Send message to WebSocket
            self.send(text_data=json.dumps({
                'message': "you are authenicated"
            }))
            logging.warning("standard play mode connected user name is "+self.scope["user"].username)
            matchId=commonFunction.getMatchid(self.scope["user"].username)
            self.joinMatchChannel(matchId,self.scope["user"].username)

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

    def disconnect(self, close_code):
        self.close()

    def joinMatchChannel(self,matchId,userName):
        async_to_sync(self.channel_layer.group_add)(matchId, self.channel_name)
        async_to_sync(self.channel_layer.group_add)(matchId+userName, self.channel_name)
        self.initializeMatch(userName)
        async_to_sync(self.channel_layer.group_send)(matchId,
            {
                "type": "standardPlay.sendMessage",
                "message": userName+" joined channel"
            }
        )
        return

    def unjoinMatchChannel(self,matchId,userName):
        async_to_sync(self.channel_layer.group_send)(matchId,
            {
                "type": "standardPlay.sendMessage",
                "message": userName+" unjoined channel"
            }
        )
        async_to_sync(self.channel_layer.group_discard)(matchId, self.channel_name)
        async_to_sync(self.channel_layer.group_add)(userName, self.channel_name)
        return

    def initializeMatch(self,userName):
        connection = redis.Redis(host='localhost', port=6379, db=0)
        match=commonFunction.findOwnMatch(userName)
        if match is None:
            raise Exception("user Initialization failed userName"+userName)
        if connection.hlen("MatchData"+str(match.match_id)) ==0:
            connection.hset("MatchData"+str(match.match_id), match.player_one+"Opponent",match.player_two)
            connection.hset("MatchData"+str(match.match_id), match.player_two+"Opponent",match.player_one)
        
        if connection.hlen("MatchData"+str(match.match_id)) ==2:
            opponentName=commonFunction.getOpponentName(userName,str(match.match_id))
            commonFunction.sendMessageToUser(userName,responseFormatter.gameStartResponse(userName,opponentName))
            commonFunction.sendMessageToUser(opponentName,responseFormatter.gameStartResponse(opponentName,userName))

        
    def standardPlay_sendMessage(self, data):
        # Send message to WebSocket
        self.send(data['message'])
        return

    def gotPlayerCardList(self,playerName,jsonCardList):
        connection = redis.Redis(host='localhost', port=6379, db=0)
        matchId=commonFunction.getMatchid(playerName)
        strCardList=json.dumps(jsonCardList)
        inRedisCardList=connection.hget("standardPlayCardList"+matchId, playerName)
        if inRedisCardList is not None:
            raise RuntimeError("player already sent card list can not send card list before clean up")
        connection.hset("standardPlayCardList"+matchId,playerName,strCardList)
        if connection.hlen("standardPlayCardList"+matchId) ==2:
            opponentName=commonFunction.getOpponentName(playerName,matchId)
            strOpponentCardList=connection.hget("standardPlayCardList"+matchId,opponentName)
            jsonOpponentCardList=json.loads(strOpponentCardList)
            commonFunction.sendMessageToUser(playerName,responseFormatter.actionDeterminedResponse(opponentName,jsonOpponentCardList))
            commonFunction.sendMessageToUser(opponentName,responseFormatter.actionDeterminedResponse(opponentName,jsonCardList))
            connection.hdel("standardPlayCardList"+matchId,playerName)
            connection.hdel("standardPlayCardList"+matchId,opponentName)
        return
    
    def gotChatMessage(self,playerName,chatMessage):
        matchId=commonFunction.getMatchid(playerName)
        commonFunction.sendMessageToOpponent(playerName,matchId,responseFormatter.gameChatResponse(chatMessage))
        return
