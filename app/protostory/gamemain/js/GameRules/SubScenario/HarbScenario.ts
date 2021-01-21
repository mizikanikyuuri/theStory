import { HitPoint } from "Utilities/Parameters/HitPoint";
import { Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {SubAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class HarbScenario extends SubAbstractScenario{
    readonly scenarioName: string;
    readonly harbNum:Map<Player,number>;
    constructor(){
        super();
        this.scenarioName="harb";
        this.harbNum=new Map();
        this.harbNum.set(Player.user,0);
        this.harbNum.set(Player.opponent,0);
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
        const player=gameState.playSpaceState.player;
        if(player===Player.null)
            throw SyntaxError("HarbScenario payCost was called while player is null");
        return this.decreaseHarb(gameState,1,player);
    }
    protected _doEffect(gameState: GameState): void {
        console.log("using harb");
        const player=gameState.playSpaceState.player;
        if(player===Player.null)
            throw SyntaxError("HarbScenario doEffect was called while player is null");
        gameState.playerOracle.getParam(HitPoint).change(10);
    }
    protected _cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
    increaseHarb(gameState:GameState,amount:number,player:Player.user|Player.opponent):void{
        this.harbNum.set(player,this.harbNum[player]+amount);
    }
    decreaseHarb(gameState:GameState,amount:number,player:Player.user|Player.opponent):boolean{
        if(this.harbNum[player]<amount)
            return false;
        this.harbNum.set(player,this.harbNum.get(player)-amount);
        return true;
    }
}
export default new HarbScenario();