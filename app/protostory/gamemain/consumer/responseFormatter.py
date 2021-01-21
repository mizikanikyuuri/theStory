# gamemain/responseFormatter.py
import json
def gameStartResponse(userName:str,opponentName:str):
    returnObject={
        'gameEventType':"GameStart",
        'userName':userName,
        'opponentName':opponentName,
    }
    return json.dumps(returnObject)
def actionDeterminedResponse(startPlayer,cardList):
    returnObject={
        'gameEventType':"ActionDetermined",
        'startPlayer':startPlayer,
        'cardList':cardList
    }
    return json.dumps(returnObject)
def gamerOverResponse():
    returnObject={
        'gameEventType':"GameOver"
    }
    return json.dumps(returnObject)
