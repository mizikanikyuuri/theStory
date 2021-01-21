# portal/consumers.py
import json
import redis
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from portal.models import GameMatch
import asyncio


class MatchMakeConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        if not self.scope["user"].is_authenticated:
            self.close()
        if self.findMatch()!=True:
            self.joinQueue()

    def disconnect(self, close_code):
        self.unjoinQueue()
        self.close()

    def joinQueue(self):
        connection = redis.Redis(host='localhost', port=6379, db=0)
        connection.hset("queue_list",self.scope["user"].username,"matching")
        # Join matching group
        async_to_sync(self.channel_layer.group_add)(
            "matching_"+self.scope["user"].username,
            self.channel_name
        )

    def unjoinQueue(self):
        connection = redis.Redis(host='localhost', port=6379, db=0)
        connection.hdel("queue_list",self.scope["user"].username)
        # Leave matching group
        async_to_sync(self.channel_layer.group_discard)(
            "matching_"+self.scope["user"].username,
            self.channel_name
        )
    
    def findMatch(self):
        connection = redis.Redis(host='localhost', port=6379, db=0)
        if connection.hlen("queue_list") >0:
            player_pool=connection.hkeys("queue_list")
            connection.hdel("queue_list",player_pool[0].decode())
            self.matchMake(player_pool[0].decode(),self.scope["user"].username)
            return True
        else:
            return False

    def matchMake(self, player_one,player_two):
        # Send message to oppoenet
        async_to_sync(self.channel_layer.group_add)("matching_"+player_one, self.channel_name)
        async_to_sync(self.channel_layer.group_send)(
            "matching_"+player_one,
            {
                "type": "matchMake.chosenToOpponent",
                "message": player_one+" VS "+player_two,
                "channelOwner": player_one,
            }
        )
        match=GameMatch.objects.create(player_one=player_one,player_two=player_two,match_status='MATCHED')
        match.save()

    def matchMake_chosenToOpponent(self, event):
        playerName = event['message']
        
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': "match found",
            'opponent' : playerName
        }))
        async_to_sync(self.channel_layer.group_discard)("matching_"+event['channelOwner'], self.channel_name)