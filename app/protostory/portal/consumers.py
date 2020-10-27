# portal/consumers.py
import json
import redis
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from portal.models import GameMatch
import asyncio


class MatchMakeConsumer(WebsocketConsumer):
    def connect(self):
        if not self.scope["user"].is_authenticated:
            self.close()
        self.accept()
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
        self.close()
    
    def findMatch(self):
        connection = redis.Redis(host='localhost', port=6379, db=0)
        if connection.hlen("queue_list") >0:
            player_pool=connection.hkeys("queue_list")
            self.matchMake(player_pool[0].decode(),self.scope["user"].username)
            return True
        else:
            return False

    def matchMake(self, player_one,player_two):
        # Send message to oppoenet
        connection = redis.Redis(host='localhost', port=6379, db=0)
        connection.hdel("queue_list",self.scope["user"].username)
        loop = asyncio.new_event_loop()
        task1 = loop.create_task(
            self.channel_layer.group_send(
            "matching_"+player_one,
            {
                "type": "chosen_to_opponent",
                "message": player_two,
            }
        ))
        task2 = loop.create_task(
            self.send(text_data=json.dumps({
                'message': "match found",
                'opponent' : player_one
            }))
        )
        loop.run_until_complete(asyncio.gather(task1, task2))
        match=GameMatch.objects.create(player_one=player_one,player_two=player_two,match_status='MATCHED')
        match.save()
        self.close()

    def chosen_to_opponent(self, event):
        playerName = event['message']
        
        # Send message to WebSocket
        async_to_sync(self.send)(text_data=json.dumps({
            'message': "match found",
            'opponent' : playerName
        }))
        self.unjoinQueue()

