import redis
import logging
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from portal.models import GameMatch

def findOwnMatch(userName:str)->GameMatch:
    gameMatch=GameMatch.objects.filter(player_one=userName,match_status='MATCHED')
    if not gameMatch.exists():
        gameMatch=GameMatch.objects.filter(player_two=userName,match_status='MATCHED')
        if not gameMatch.exists():
            logging.error("gameMatch was not found user name "+userName+".check protostory database gamematch witch status is 'MATCHED'.")
            return None
    return gameMatch[0]

def getMatchid(userName):
    ownMatch=findOwnMatch(userName)
    if ownMatch is not None:
        return str(ownMatch.match_id)
    else :
        return None

def getOpponentName(playerName,matchId)->str:
    connection = redis.Redis(host='localhost', port=6379, db=0)
    opponent =  connection.hget("MatchData"+matchId, playerName+"Opponent")
    if opponent is None:
        raise RuntimeError("In MatchData could not find opponent.Match id "+matchId+",playerName"+playerName)
    return str(opponent,'utf-8')

def sendMessageToUser(playerName,data):
    channel_layer = get_channel_layer()
    matchId=getMatchid(playerName)
    async_to_sync(channel_layer.group_send)(
        matchId+playerName,
        {
            "type": "standardPlay.sendMessage",
            "message": data
        }
    )

def sendMessageToOpponent(playerName,matchId,data):
    opponentName=getOpponentName(playerName,matchId)
    sendMessageToUser(opponentName,data)
