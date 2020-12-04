import { Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {MainScenarioInterface} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class GodPunishmentScenario implements MainScenarioInterface{
    readonly senarioName: string;
    constructor(){
        this.senarioName="godPunishment";
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
        console.log("god will make your opponent worst day.");
        //
    }
    cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
}
export default new GodPunishmentScenario();