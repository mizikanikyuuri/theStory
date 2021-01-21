import { Player } from "GameRules/CommonGameObjects";
import { GoldAmount } from "Utilities/Parameters/GoldAmount";
import { HitPoint } from "Utilities/Parameters/HitPoint";
import { GameState } from "../GameState/GameState";
import {MainAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class StayChildGirlScenario extends MainAbstractScenario{
    readonly scenarioName: string;
    playedTimeCount:number=0;
    constructor(){
        super();
        this.scenarioName="stayChildGirl";
    }
    protected _setToDeck(gameState: GameState): void {
        return;
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
        console.log("you met staychiled who was sitting at sidestreet. ");
        switch(this.playedTimeCount){
            case 0:
                this.findingHouse(gameState);
                break;
            case 1:
                this.takeCarriage(gameState);
                break;
            case 2:
                this.givingBack(gameState);
                break;
            case 3:
                this.childHasGone(gameState);
                break;
            case 4:
                this.wanderSideStreet(gameState);
        }
        this.playedTimeCount++;
    }
    protected _cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
    private findingHouse(gameState: GameState){
        gameState.playerOracle.getParam(HitPoint).change(-2);
    }
    private takeCarriage(gameState: GameState){
        gameState.playerOracle.getParam(GoldAmount).change(-2);
    }
    private givingBack(gameState: GameState){
        gameState.playerOracle.getParam(GoldAmount).change(8);
        ScenarioCommonFunctions.removeCardFromDeck(gameState,this.scenarioName);
    }
    private childHasGone(gameState: GameState){
        return;
    }
    private wanderSideStreet(gameState: GameState){
        gameState.playerOracle.getParam(GoldAmount).change(-2);
    }
}
export default new StayChildGirlScenario();