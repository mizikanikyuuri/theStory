import { Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {SubScenarioInterface} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class SteelSwordScenario implements SubScenarioInterface{
    readonly senarioName: string;
    readonly steelSwordNumParameterName="playerSteelSwordNum";
    constructor(){
        this.senarioName="steelSword";
    }
    setToSubScenarioSpace(gameState: GameState): void {
        if(typeof gameState.getState(this.steelSwordNumParameterName)!=="undefined")
            return;
        const playerSteelSwordNum=new Map();
        playerSteelSwordNum.set(Player.user,0);
        playerSteelSwordNum.set(Player.opponent,0);
        gameState.addState(this.steelSwordNumParameterName,playerSteelSwordNum);
    }
    prePlay(gameState: GameState): void {
        return;
    }
    payCost(gameState: GameState): boolean {
        return true;
    }
    doEffect(gameState: GameState): void {
        return;
    }
    cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
    increaseSteelSword(gameState:GameState,amount:number,player:Player.user|Player.opponent):void{
        const steelSwordNum=gameState.getState(this.steelSwordNumParameterName);
        steelSwordNum.set(player,steelSwordNum.get(player)+amount);
        gameState.setState(this.steelSwordNumParameterName,steelSwordNum);
        gameState.playerOracle.getParam("goldAmount").change(5*amount);
    }
    decreaseSteelSword(gameState:GameState,amount:number,player:Player.user|Player.opponent):boolean{
        const steelSwordNum=gameState.getState(this.steelSwordNumParameterName);
        if(steelSwordNum.get(player)<amount)
            return false;
            steelSwordNum.set(player,steelSwordNum.get(player)-amount);
        gameState.setState(this.steelSwordNumParameterName,steelSwordNum);
        gameState.playerOracle.getParam("goldAmount").change(-5*amount);
        return true;
    }
}
export default new SteelSwordScenario();