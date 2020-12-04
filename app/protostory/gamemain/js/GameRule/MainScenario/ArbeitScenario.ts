import { Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {MainScenarioInterface} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class ArbeitScenario implements MainScenarioInterface{
    readonly senarioName: string;
    constructor(){
        this.senarioName="arbeit";
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
        return true;
    }
    doEffect(gameState: GameState): void {
        if(gameState.playerOracle===null)
            throw SyntaxError("ArbeitScenario doEffect was called while player is null");
        gameState.playerOracle.getParam("goldAmount").change(2);
    }
    cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
}
export default new ArbeitScenario();