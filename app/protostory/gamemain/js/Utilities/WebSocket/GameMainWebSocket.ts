import { Player } from "GameRules/CommonGameObjects";
import { PlacedCardState } from "GameRules/GameState/PlacedCardState";
enum GameMainConnectionResponseEvents{
    "GameStart"="GameStart",
    "ActionDetermined"="ActionDetermined",
    "GameOver"="GameOver",
}
type GameStartResponse={
    userName:string,
    opponentName:string
}
type ActionDeterminedResponse={
    startPlayer:string
    cardList:Array<{scenarioName:string}>,
}
type GameOverResponse={

}
class GameMainWebSocket extends WebSocket{
    constructor(url:string) {
        super(url);
        this.addEventListener("message", function(e) {
            console.log("gotMessage");
            console.log(e);
        });
        this.onclose = function(e) {
            console.error('GameMain socket closed.');
        };
      }
    turnEnd(cardList:Array<{scenarioName:string}>){
        this.send(JSON.stringify({
            message: "TurnEnded",
            cardData: cardList
        }));
    }
    gameEnd(){

    }
    addGameEventListener(type: GameMainConnectionResponseEvents,listener: (data: GameStartResponse|ActionDeterminedResponse|GameOverResponse) => any){
        const settingCallBack=( event: MessageEvent<any>)=>{
            let data;
            try{
                data=JSON.parse(event.data);
            }catch(e){
                return;
            }
            if(data.gameEventType===undefined)
                return
            if(data.gameEventType===type)
                listener(data);
        }
        this.addEventListener("message",settingCallBack);
    }
}
export{GameStartResponse,ActionDeterminedResponse,GameOverResponse,GameMainConnectionResponseEvents,GameMainWebSocket}