import { Player } from "GameRules/CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {MainAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class LazeScenario extends MainAbstractScenario{
    readonly scenarioName: string;
    constructor(){
        super();
        this.scenarioName="laze";
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
        return;
    }
    protected _payCost(gameState: GameState): boolean {
        return true;
    }
    protected _doEffect(gameState: GameState): void {
        console.log("yes take rest is important. you cat do it tomorrow.");
        return;
    }
    protected _cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
}
export default new LazeScenario();