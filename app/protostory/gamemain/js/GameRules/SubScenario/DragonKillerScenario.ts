import { AttackPower } from "Utilities/Parameters/AttackPower";
import { Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {SubAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class DragonKillerScenario extends SubAbstractScenario{
    readonly scenarioName: string;
    readonly dragonKillerNum:Map<Player,number>;
    constructor(){
        super();
        this.scenarioName="dragonKiller";
        this.dragonKillerNum=new Map();
        this.dragonKillerNum.set(Player.user,0);
        this.dragonKillerNum.set(Player.opponent,0);
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
    increaseDragonKiller(gameState:GameState,amount:number,player:Player.user|Player.opponent):void{
        console.log("new amount"+this.dragonKillerNum.get(player)+amount);
        this.dragonKillerNum.set(player,this.dragonKillerNum.get(player)+amount);
        if(player===Player.user)
            gameState.user.getParam(AttackPower).change(20*amount);
        else
            gameState.opponent.getParam(AttackPower).change(20*amount);
    }
    decreaseDragonKiller(gameState:GameState,amount:number,player:Player.user|Player.opponent):boolean{
        if(this.dragonKillerNum[player]<amount)
            return false;
        this.dragonKillerNum.set(player,this.dragonKillerNum.get(player)-amount);
        if(player===Player.user)
            gameState.user.getParam(AttackPower).change(-20*amount);
        else
            gameState.opponent.getParam(AttackPower).change(-20*amount);
        return true;
    }
}
export default new DragonKillerScenario();