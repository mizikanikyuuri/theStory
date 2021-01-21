import { AttackPower } from "Utilities/Parameters/AttackPower";
import { Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {SubAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class SteelSwordScenario extends SubAbstractScenario{
    readonly scenarioName: string;
    readonly steelSwordNum:Map<Player,number>;
    constructor(){
        super();
        this.scenarioName="steelSword";
        this.steelSwordNum=new Map();
        this.steelSwordNum.set(Player.user,0);
        this.steelSwordNum.set(Player.opponent,0);
    }
    protected _setToSubScenarioSpace(gameState: GameState,player:Player): void {
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
        return;
    }
    protected _cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
    increaseSteelSword(gameState:GameState,amount:number,player:Player.user|Player.opponent):void{
        console.log("new amount"+this.steelSwordNum.get(player)+amount);
        this.steelSwordNum.set(player,this.steelSwordNum.get(player)+amount);
        if(player===Player.user)
            gameState.user.getParam(AttackPower).change(5*amount);
        else
            gameState.opponent.getParam(AttackPower).change(5*amount);
    }
    decreaseSteelSword(gameState:GameState,amount:number,player:Player.user|Player.opponent):boolean{
        if(this.steelSwordNum[player]<amount)
            return false;
        this.steelSwordNum.set(player,this.steelSwordNum.get(player)-amount);
        if(player===Player.user)
            gameState.user.getParam(AttackPower).change(-5*amount);
        else
            gameState.opponent.getParam(AttackPower).change(-5*amount);
        return true;
    }
}
export default new SteelSwordScenario();