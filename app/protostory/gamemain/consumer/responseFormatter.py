# gamemain/responseFormatter.py
import json
import bleach
def gameStartResponse(userName:str,opponentName:str):
    returnObject={
        'gameEventType':"GameStart",
        'userName':bleach.clean(userName),
        'opponentName':bleach.clean(opponentName),
    }
    return json.dumps(returnObject)
def actionDeterminedResponse(startPlayer,cardList):
    returnObject={
        'gameEventType':"ActionDetermined",
        'startPlayer':startPlayer,
        'cardList':cardList
    }
    return json.dumps(returnObject)
def gameOverResponse():
    returnObject={
        'gameEventType':"GameOver"
    }
    return json.dumps(returnObject)

def gameChatResponse(chatMessage):
    returnObject={
        'gameEventType':"GameChat",
        'chatMessage':bleach.clean(chatMessage),
    }
    return json.dumps(returnObject)