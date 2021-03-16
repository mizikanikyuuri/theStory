import CozyRelationshipScenario from "GameRules/SubScenario/CozyRelationshipScenario";
import { GoldAmount } from "Utilities/Parameters/GoldAmount";
import { Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {MainAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class GiveBribeScenario extends MainAbstractScenario{
    readonly scenarioName: string;
    constructor(){
        super();
        this.scenarioName="giveBribe";
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
        if(gameState.playerOracle===null)
            throw SyntaxError("GiveBribeScenario payCost was called while player is null");
        if(gameState.playerOracle.getParam(GoldAmount).current<5)
            return false;

        gameState.playerOracle.getParam(GoldAmount).change(-5);
        return true;
    }
    protected _doEffect(gameState: GameState): void {
        console.log("giving bribe");
        const player=gameState.playSpaceState.player;
        if(player===Player.null)
            throw SyntaxError("GiveBribeScenario doEffect was called while player is null");
        gameState.subScenarioSpaceState.addSubScenario(player,"bribe",gameState);
        CozyRelationshipScenario.increaseCozyRelationShip(gameState,1,player);
    }
    protected _cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
}
export default new GiveBribeScenario();