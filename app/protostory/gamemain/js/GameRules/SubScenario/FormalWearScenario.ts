import { Charm } from "Utilities/Parameters/Charm";
import { Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {SubAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class FormalWearScenario extends SubAbstractScenario{
    readonly scenarioName: string;
    readonly formalWearNum:Map<Player,number>;
    constructor(){
        super();
        this.scenarioName="formalWear";
        this.formalWearNum=new Map();
        this.formalWearNum.set(Player.user,0);
        this.formalWearNum.set(Player.opponent,0);
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
    increaseFormalWear(gameState:GameState,amount:number,player:Player.user|Player.opponent):void{
        if(gameState.playerOracle.getParam(Charm)===null)
            this.addCharmState(gameState);
        console.log("new amount"+this.formalWearNum.get(player)+amount);
        this.formalWearNum.set(player,this.formalWearNum.get(player)+amount);
        if(player===Player.user)
            gameState.user.getParam(Charm).change(5*amount);
        else
            gameState.opponent.getParam(Charm).change(5*amount);
    }
    decreaseFormalWear(gameState:GameState,amount:number,player:Player.user|Player.opponent):boolean{
        if(this.formalWearNum[player]<amount)
            return false;
        this.formalWearNum.set(player,this.formalWearNum.get(player)-amount);
        if(player===Player.user)
            gameState.user.getParam(Charm).change(-5*amount);
        else
            gameState.opponent.getParam(Charm).change(-5*amount);
        return true;
    }
    addCharmState(gameState: GameState){
        gameState.playerOracle.addNewParameter(new Charm(0));
    }
}
export default new FormalWearScenario();