# gamemain/consumers.py
import json
import redis
import logging
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from gamemain.consumer import responseFormatter
from gamemain.consumer.requestPatterns import RequestPatterns
from portal.models import GameMatch


class StandardPlayConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        if self.scope["user"].is_authenticated:
            # Send message to WebSocket
            self.send(text_data=json.dumps({
                'message': "you are authenicated"
            }))
            logging.warning("connected user name is "+self.scope["user"].username)
            matchId=self.getMatchid(self.scope["user"].username)
            self.joinMatchChannel(matchId,self.scope["user"].username)

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
            logging.warning("cardData has been sent. user name is "+self.scope["user"].username)
            matchId=self.getMatchid(self.scope["user"].username)
            self.gotPlayerCardList(matchId,self.scope["user"].username,jsonData['cardData'])
            # self.send(responseFormatter.actionDeterminedResponse(jsonData['cardData']))
            return

        if jsonData['message']==RequestPatterns.GameOver.value:
            self.send(responseFormatter.gamerOverResponse())
            return
        raise ValueError("recieved websocket request but message type is invalid",jsonData)

    def disconnect(self, close_code):
        self.close()

    def getMatchid(self,userName):
        return str(self.findOwnMatch(userName).match_id)
    
    def findOwnMatch(self,userName:str)->GameMatch:
        gameMatch=GameMatch.objects.filter(player_one=userName,match_status='MATCHED')
        if not gameMatch.exists():
            gameMatch=GameMatch.objects.filter(player_two=userName,match_status='MATCHED')
        if not gameMatch.exists():
            self.close()
            logging.error("gameMatch was not found user name "+userName+".check protostory database gamematch witch status is 'MATCHED'.")
        return gameMatch[0]

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

    def sendMessageToUser(self,playerName,data):
        matchId=self.getMatchid(playerName)
        async_to_sync(self.channel_layer.group_send)(
            matchId+playerName,
            {
                "type": "standardPlay.sendMessage",
                "message": data
            }
        )

    def initializeMatch(self,userName):
        connection = redis.Redis(host='localhost', port=6379, db=0)
        match=self.findOwnMatch(userName)
        if connection.hlen("MatchData"+str(match.match_id)) ==0:
            connection.hset("MatchData"+str(match.match_id), match.player_one+"Opponent",match.player_two)
            connection.hset("MatchData"+str(match.match_id), match.player_two+"Opponent",match.player_one)
        
        if connection.hlen("MatchData"+str(match.match_id)) ==2:
            opponentName=self.getOpponentName(userName,str(match.match_id))
            self.sendMessageToUser(userName,responseFormatter.gameStartResponse(userName,opponentName))
            self.sendMessageToUser(opponentName,responseFormatter.gameStartResponse(opponentName,userName))

        
    def standardPlay_sendMessage(self, data):
        # Send message to WebSocket
        self.send(data['message'])
        return

    def getOpponentName(self,playerName,matchId)->str:
        connection = redis.Redis(host='localhost', port=6379, db=0)
        opponent =  connection.hget("MatchData"+matchId, playerName+"Opponent")
        if opponent is None:
            raise RuntimeError("In MatchData could not find opponent.Match id "+matchId+",playerName"+playerName)
        return str(opponent,'utf-8')

    def gotPlayerCardList(self,matchId,playerName,jsonCardList):
        connection = redis.Redis(host='localhost', port=6379, db=0)
        strCardList=json.dumps(jsonCardList)
        inRedisCardList=connection.hget("standardPlayCardList"+matchId, playerName)
        if inRedisCardList is not None:
            raise RuntimeError("player already sent card list can not send card list before clean up")
        connection.hset("standardPlayCardList"+matchId,playerName,strCardList)
        if connection.hlen("standardPlayCardList"+matchId) ==2:
            opponentName=self.getOpponentName(playerName,matchId)
            strOpponentCardList=connection.hget("standardPlayCardList"+matchId,opponentName)
            jsonOpponentCardList=json.loads(strOpponentCardList)
            self.sendMessageToUser(playerName,responseFormatter.actionDeterminedResponse(opponentName,jsonOpponentCardList))
            self.sendMessageToUser(opponentName,responseFormatter.actionDeterminedResponse(opponentName,jsonCardList))
            connection.hdel("standardPlayCardList"+matchId,playerName)
            connection.hdel("standardPlayCardList"+matchId,opponentName)
        return