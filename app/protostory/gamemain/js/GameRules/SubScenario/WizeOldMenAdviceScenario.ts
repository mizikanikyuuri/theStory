import { OracleStates } from "GameRules/GameState/GameCharacter/OracleStates";
import { CharacterStateFookTypes, OracleStateFookTypes, Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {SubAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class WizeOldMenAdviceScenario extends SubAbstractScenario{
    readonly scenarioName: string;
    readonly adviceValidity:Map<Player,boolean>;
    callbackFunc=(gameState:GameState)=>{
        let fightTarget;
        fightTarget
    }
    constructor(){
        super();
        this.scenarioName="wizeOldMenAdviceScenario";
        this.adviceValidity=new Map();
        this.adviceValidity.set(Player.user,false);
        this.adviceValidity.set(Player.opponent,false);
    }
    protected _setToSubScenarioSpace(gameState: GameState,player:Player): void {
    }
    protected _placeCard(gameState: GameState,player:Player.user|Player.opponent): void {
        this._placeCardWithState(gameState,player);
    }
    protected _placeCardWithState(gameState: GameState,player:Player.user|Player.opponent,props:{}={}): void{
        gameState.playSpaceState.addCard(player, this.scenarioName);
    }
    protected _prePlay(gameState: GameState): void {
        return;
    }
    protected _payCost(gameState: GameState): boolean {
        const player=gameState.playSpaceState.player;
        if(player===Player.null)
            throw SyntaxError("WizeOldMenAdviceScenario payCost was called while player is null");
        return true;
    }
    protected _doEffect(gameState: GameState): void {
        console.log("using wize old men advice");
        const player=gameState.playSpaceState.player;
        if(player===Player.null)
            throw SyntaxError("WizeOldMenAdviceScenario doEffect was called while player is null");
        gameState.playerOracle.addObserver(this.adviceEffect,CharacterStateFookTypes.afterBattle);
    }
    protected _cleanUp(gameState:GameState):void{
    }
    activateAdvice(gameState:GameState,player:Player.user|Player.opponent):boolean{
        this.adviceValidity.set(player,true);
        return true;
    }
    deactivateAdvice(gameState:GameState,player:Player.user|Player.opponent):boolean{
        this.adviceValidity.set(player,false);
        return true;
    }
    adviceEffect=(oracle:OracleStates,append)=>{
        oracle.deleteObserver(this.adviceEffect,CharacterStateFookTypes.afterBattle);
        ScenarioCommonFunctions.attack(oracle,append.battelTarget);
        ScenarioCommonFunctions.attack(oracle,append.battelTarget);
    }
    
}
export default new WizeOldMenAdviceScenario();