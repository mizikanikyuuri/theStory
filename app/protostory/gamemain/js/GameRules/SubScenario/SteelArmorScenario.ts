import { DefensePower } from "Utilities/Parameters/DefensePower";
import { Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {SubAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class SteelArmorScenario extends SubAbstractScenario{
    readonly scenarioName: string;
    readonly steelArmorNum:Map<Player,number>;
    constructor(){
        super();
        this.scenarioName="steelArmor";
        this.steelArmorNum=new Map();
        this.steelArmorNum.set(Player.user,0);
        this.steelArmorNum.set(Player.opponent,0);
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
    }
    increaseSteelArmor(gameState:GameState,amount:number,player:Player.user|Player.opponent):void{
        console.log("new amount"+this.steelArmorNum.get(player)+amount);
        this.steelArmorNum.set(player,this.steelArmorNum.get(player)+amount);
        if(player===Player.user)
            gameState.user.getParam(DefensePower).change(5*amount);
        else
            gameState.opponent.getParam(DefensePower).change(5*amount);
    }
    decreaseSteelArmor(gameState:GameState,amount:number,player:Player.user|Player.opponent):boolean{
        if(this.steelArmorNum[player]<amount)
            return false;
        this.steelArmorNum.set(player,this.steelArmorNum.get(player)-amount);
        if(player===Player.user)
            gameState.user.getParam(DefensePower).change(-5*amount);
        else
            gameState.opponent.getParam(DefensePower).change(-5*amount);
        return true;
    }
}
export default new SteelArmorScenario();