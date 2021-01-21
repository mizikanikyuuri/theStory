import { Player } from "GameRules/CommonGameObjects";
import { GoldAmount } from "Utilities/Parameters/GoldAmount";
import { GameState } from "../GameState/GameState";
import {MainAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class ArbeitScenario extends MainAbstractScenario{
    readonly scenarioName: string;
    constructor(){
        super();
        this.scenarioName="arbeit";
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
        if(gameState.playerOracle===null)
            throw SyntaxError("ArbeitScenario doEffect was called while player is null");
        gameState.playerOracle.getParam(GoldAmount).change(2);
    }
    protected _cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
}
export default new ArbeitScenario();