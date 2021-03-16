import { GameState } from "./GameState/GameState"
import { DeckCardMoveType } from "./GameState/DeckSpaceState"
import {CharacterStates} from "GameRules/GameState/GameCharacter/CharacterStates"
import { AttackPower } from "Utilities/Parameters/AttackPower";
import { HitPoint } from "Utilities/Parameters/HitPoint";
import { DefensePower } from "Utilities/Parameters/DefensePower";
import { SaintClause } from "Utilities/Parameters/SaintClause";
import { InputQueue ,SingleCardSelect  } from "./GameState/InputQueue";
import { CharacterStateFookTypes } from "./CommonGameObjects";
class ScenarioCommonFunctions {
    static checkPlayedScenario= (scenarioName: string, gameState: GameState): boolean => {
        if (gameState.playSpaceState.getPlayedScenarioNames().includes(scenarioName)) {
            return true;
        }
        return false;
    }
    static checkPrePlayedScenario= (scenarioName: string, gameState: GameState): boolean => {
        if (gameState.playSpaceState.getPrePlayedScenarioNames().includes(scenarioName)) {
            return true;
        }
        return false;
    }
    static commonCleanUp = (gameState: GameState):void => {
        const cleanUpCard = gameState.deckSpaceState.initializingDeck.getCard(0);
        gameState.deckSpaceState.initializingDeck.moveCard(cleanUpCard, DeckCardMoveType.Bottom);
    }
    //return dealt damage;
    static attack = (attacker:CharacterStates<any>,target:CharacterStates<any>):number=>{
        let dealtDmg = attacker.getParam(AttackPower).current - target.getParam(DefensePower).current;
        attacker.notifyObserver([CharacterStateFookTypes.beforeAttack]);
        dealtDmg = dealtDmg < 0 ? 0 : dealtDmg;
        if(dealtDmg>0&&target.getParam(SaintClause)!==null&&target.getParam(SaintClause).current==="valid"){
            dealtDmg=0;
            target.getParam(SaintClause).deactivate();
        }
        target.getParam(HitPoint).change(-dealtDmg);
        attacker.notifyObserver([CharacterStateFookTypes.afterAttack]);
        return dealtDmg;
    }
    /*
    Attack order is challenger to deffender.
    If attacker make deffender health 0,this function return true.
    If deffende health is below 0 before fight start,this function  return false and do nothing.
    */
    static battle= (challenger: CharacterStates<any>, deffender: CharacterStates<any>):boolean => {
        if (deffender.getParam(HitPoint).current <= 0)
            return false;
        challenger.notifyObserver([CharacterStateFookTypes.beforeBattle]);
        ScenarioCommonFunctions.attack(challenger,deffender);
        ScenarioCommonFunctions.attack(deffender,challenger);
        challenger.notifyObserver([CharacterStateFookTypes.afterBattle]);
        if (deffender.getParam(HitPoint).current <= 0)
            return true;
        return false;
    }
    static selectCard=(gameState: GameState,cardList:Array<string>,callBack:(cardName:string)=>void)=>{
        function setCallBack(selectedCardName:string){
            callBack(selectedCardName);
            gameState.inputWaitingQueue.delete(this);
        }
        const singleCardSelect = new SingleCardSelect(cardList,setCallBack);
        gameState.inputWaitingQueue.add(singleCardSelect);
    }
    static getAllDeckScenario=(gameState: GameState):Array<string>=>{
        return gameState.deckSpaceState.getAllDeckStates().map(deckState=>deckState.cardNames).flat();
    }
    static removeCardFromDeck=(gameState: GameState,scenarioName:string):void=>{
        gameState.deckSpaceState.getAllDeckStates().filter(deckState=>deckState.has(scenarioName))
            .forEach(deckState=>{
                const removingCardList = deckState.getCardByName(scenarioName);
                removingCardList.forEach(cardState=>deckState.removeCard(cardState))
            });
    }
};

export { ScenarioCommonFunctions }