import { Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {SubAbstractScenario} from "../Scenario"
class CozyRelationshipScenario extends SubAbstractScenario{
    readonly scenarioName: string;
    readonly relationNum:Map<Player,number>;
    constructor(){
        super();
        this.scenarioName="cozyRelationship";
        this.relationNum=new Map();
        this.relationNum.set(Player.user,0);
        this.relationNum.set(Player.opponent,0);
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
        console.log("cannot be touched");
    }
    protected _cleanUp(gameState:GameState):void{
    }
    increaseCozyRelationShip(gameState:GameState,amount:number,player:Player.user|Player.opponent):void{
        this.relationNum.set(player,this.relationNum[player]+amount);
    }
    decreaseCozyRelationShip(gameState:GameState,amount:number,player:Player.user|Player.opponent):boolean{
        if(this.relationNum[player]<amount)
            return false;
        this.relationNum.set(player,this.relationNum.get(player)-amount);
        return true;
    }
}
export default new CozyRelationshipScenario();