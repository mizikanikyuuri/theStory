import { Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {SubScenarioInterface} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class HarbScenario implements SubScenarioInterface{
    readonly senarioName: string;
    readonly harbNumParameterName="playerHarbNum";
    constructor(){
        this.senarioName="harb";
    }
    setToSubScenarioSpace(gameState: GameState): void {
        if(typeof gameState.getState(this.harbNumParameterName)!=="undefined")
            return;
        const playerHarbNum=new Map();
        playerHarbNum.set(Player.user,0);
        playerHarbNum.set(Player.opponent,0);
        gameState.addState(this.harbNumParameterName,playerHarbNum);
    }
    prePlay(gameState: GameState): void {
        return;
    }
    payCost(gameState: GameState): boolean {
        const player=gameState.playSpaceState.player;
        if(player===Player.null)
            throw SyntaxError("HarbScenario payCost was called while player is null");
        return this.decreaseHarb(gameState,1,player);
    }
    doEffect(gameState: GameState): void {
        console.log("using harb");
        const player=gameState.playSpaceState.player;
        if(player===Player.null)
            throw SyntaxError("HarbScenario doEffect was called while player is null");
        gameState.playerOracle.getParam("hitPoint").change(10);
    }
    cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
    increaseHarb(gameState:GameState,amount:number,player:Player.user|Player.opponent):void{
        const harbNum=gameState.getState(this.harbNumParameterName);
        harbNum.set(player,harbNum.get(player)+amount);
        gameState.setState(this.harbNumParameterName,harbNum);
    }
    decreaseHarb(gameState:GameState,amount:number,player:Player.user|Player.opponent):boolean{
        const harbNum=gameState.getState(this.harbNumParameterName);
        if(harbNum.get(player)<amount)
            return false;
        harbNum.set(player,harbNum.get(player)-amount);
        gameState.setState(this.harbNumParameterName,harbNum);
        return true;
    }
}
export default new HarbScenario();