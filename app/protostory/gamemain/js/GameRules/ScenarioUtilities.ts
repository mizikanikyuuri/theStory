import { GameState } from "./GameState/GameState"
import { DeckCardMoveType } from "./GameState/DeckSpaceState"
import { OracleStates } from "./GameState/OracleStates";
import { MonsterStates } from "./GameState/MonsterStates";
import { AttackPower } from "Utilities/Parameters/AttackPower";
import { HitPoint } from "Utilities/Parameters/HitPoint";
import { DefensePower } from "Utilities/Parameters/DefensePower";
import { SaintClause } from "Utilities/Parameters/SaintClause";
import { InputQueue ,SingleCardSelect  } from "./GameState/InputQueue";
const ScenarioCommonFunctions = {
    checkPlayedScenario: (scenarioName: string, gameState: GameState): boolean => {
        if (gameState.playSpaceState.getPlayedScenarioNames().includes(scenarioName)) {
            return true;
        }
        return false;
    },
    checkPrePlayedScenario: (scenarioName: string, gameState: GameState): boolean => {
        if (gameState.playSpaceState.getPrePlayedScenarioNames().includes(scenarioName)) {
            return true;
        }
        return false;
    },
    commonCleanUp: (gameState: GameState):void => {
        const cleanUpCard = gameState.deckSpaceState.initializingDeck.getCard(0);
        gameState.deckSpaceState.initializingDeck.moveCard(cleanUpCard, DeckCardMoveType.Bottom);
    },
    /*
    1.caliculate damage
    2.if damage is less than 0 maket it 0
    3.check both caintClause state. if it valid make damage 0
    */
    battle: (oracleState: OracleStates, monsterState: MonsterStates):boolean => {
        if (monsterState.getParam(HitPoint).current <= 0)
            return false;
        let monsterDealtDmg = monsterState.getParam(AttackPower).current - oracleState.getParam(DefensePower).current;
        let playerDealtDmg = oracleState.getParam(AttackPower).current - monsterState.getParam(DefensePower).current;
        monsterDealtDmg = monsterDealtDmg < 0 ? 0 : monsterDealtDmg;
        playerDealtDmg = playerDealtDmg < 0 ? 0 : playerDealtDmg;
        if (monsterDealtDmg === 0 && playerDealtDmg === 0)
            return false;
        if(playerDealtDmg>0&&monsterState.getParam(SaintClause)!==null&&monsterState.getParam(SaintClause).current==="valid"){
            playerDealtDmg=0;
            monsterState.getParam(SaintClause).deactivate();
        }
        if(monsterDealtDmg>0&&oracleState.getParam(SaintClause)!==null&&oracleState.getParam(SaintClause).current==="valid"){
            monsterDealtDmg=0;
            oracleState.getParam(SaintClause).deactivate();
        }
        monsterState.getParam(HitPoint).change(-playerDealtDmg);
        oracleState.getParam(HitPoint).change(-monsterDealtDmg);
        if (monsterState.getParam(HitPoint).current <= 0)
            return true;
        return false;
    },
    selectCard:(gameState: GameState,cardList:Array<string>,callBack:(cardName:string)=>void)=>{
        function setCallBack(selectedCardName:string){
            callBack(selectedCardName);
            gameState.inputWaitingQueue.delete(this);
        }
        const singleCardSelect = new SingleCardSelect(cardList,setCallBack);
        gameState.inputWaitingQueue.add(singleCardSelect);
    },
    getAllDeckScenario:(gameState: GameState):Array<string>=>{
        return gameState.deckSpaceState.getAllDeckStates().map(deckState=>deckState.cardNames).flat();
    },
    removeCardFromDeck:(gameState: GameState,scenarioName:string):void=>{
        gameState.deckSpaceState.getAllDeckStates().filter(deckState=>deckState.has(scenarioName))
            .forEach(deckState=>{
                const removingCardList = deckState.getCardByName(scenarioName);
                removingCardList.forEach(cardState=>deckState.removeCard(cardState))
            });
    }
};

export { ScenarioCommonFunctions }