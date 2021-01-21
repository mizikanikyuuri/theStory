import { SaintClause } from "Utilities/Parameters/SaintClause";
import { Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {MainAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class SaintClauseScenario extends MainAbstractScenario{
    readonly scenarioName: string;
    constructor(){
        super();
        this.scenarioName="saintClause";
    }
    protected _setToDeck(gameState: GameState): void {
        return;
    }
    protected _placeCard(gameState: GameState,player:Player.user|Player.opponent): void {
        this._placeCardWithState(gameState,player);
    }
    protected _placeCardWithState(gameState: GameState,player:Player.user|Player.opponent,props:{}={}): void{
        gameState.playSpaceState.addCard(player, this.scenarioName);
    }
    protected _prePlay(gameState: GameState): void {
        if(ScenarioCommonFunctions.checkPrePlayedScenario(this.scenarioName,gameState)){
            gameState.playSpaceState.prePlayingCard.validity="invalid";
        }
    }
    protected _payCost(gameState: GameState): boolean {
        return true;
    }
    protected _doEffect(gameState: GameState): void {
        console.log("spelling saint clause.");
        const player=gameState.playSpaceState.player;
        if(player===Player.null)
            throw SyntaxError("ArbeitScenario doEffect was called while player is null");
        if(gameState.playerOracle.getParam(SaintClause)===null)
            this.addSaintClauseState(gameState);
        gameState.playerOracle.getParam(SaintClause).activate();
    }
    protected _cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
    addSaintClauseState(gameState: GameState){
        gameState.playerOracle.addNewParameter(new SaintClause());
    }
}
export default new SaintClauseScenario();