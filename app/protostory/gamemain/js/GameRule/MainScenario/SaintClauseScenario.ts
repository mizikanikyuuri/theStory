import { SaintClause } from "Utilities/Parameters/SaintClause";
import { Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {MainScenarioInterface} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class SaintClauseScenario implements MainScenarioInterface{
    readonly senarioName: string;
    constructor(){
        this.senarioName="saintClause";
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
        console.log("spelling saint clause.");
        const player=gameState.playSpaceState.player;
        if(player===Player.null)
            throw SyntaxError("ArbeitScenario doEffect was called while player is null");
        if(gameState.playerOracle.getParam("saintClause")===null)
            this.addSaintClauseState(gameState);
        gameState.playerOracle.getParam("saintClause").activate();
    }
    cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
    addSaintClauseState(gameState: GameState){
        gameState.playerOracle.addNewParameter(new SaintClause("invalid"));
    }
}
export default new SaintClauseScenario();