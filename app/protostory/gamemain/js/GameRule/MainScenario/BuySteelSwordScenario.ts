import { Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {MainScenarioInterface} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
import HarbScenario from "../SubScenario/HarbScenario"
class BuySteelSwordScenario implements MainScenarioInterface{
    readonly senarioName: string;
    constructor(){
        this.senarioName="buySteelSword";
    }
    setToDeck(gameState: GameState): void {
        return;
    }
    prePlay(gameState: GameState): void {
        if(ScenarioCommonFunctions.checkPrePlayedScenario(this.senarioName,gameState)){
            gameState.playSpaceState.prePlayingCard.validity="invalid";
        }
    }
    payCost(gameState: GameState): boolean {
        if(gameState.playerOracle===null)
            throw SyntaxError("ArbeitScenario doEffect was called while player is null");
        if(gameState.playerOracle.getParam("goldAmount").current<5)
            return false;

        gameState.playerOracle.getParam("goldAmount").change(-5);
        return true;
    }
    doEffect(gameState: GameState): void {
        console.log("adding steelSword");
        const player=gameState.playSpaceState.player;
        if(player===Player.null)
            throw SyntaxError("ArbeitScenario doEffect was called while player is null");
        gameState.subScenarioSpaceState.addSubScenario(player,"harb",gameState);
        HarbScenario.increaseHarb(gameState,1,player);
    }
    cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
}
export default new BuySteelSwordScenario();