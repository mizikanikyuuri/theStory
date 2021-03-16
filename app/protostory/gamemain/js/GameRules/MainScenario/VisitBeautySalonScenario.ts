import { OracleStates } from "GameRules/GameState/GameCharacter/OracleStates";
import { Charm } from "Utilities/Parameters/Charm";
import { GoldAmount } from "Utilities/Parameters/GoldAmount";
import { GameStateFookTypes, Player } from "../CommonGameObjects";
import { GameState } from "../GameState/GameState";
import {MainAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class VisitBeautySalonScenario extends MainAbstractScenario{
    readonly scenarioName: string;
    constructor(){
        super();
        this.scenarioName="visitBeautySalon";
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
        if(gameState.playerOracle===null)
            throw SyntaxError("VisitBeautySalonScenario payCost was called while player is null");
        if(gameState.playerOracle.getParam(GoldAmount).current<2)
            return false;

        gameState.playerOracle.getParam(GoldAmount).change(-2);
        return true;
    }
    protected _doEffect(gameState: GameState): void {
        console.log("looks good now ");
        if(gameState.playerOracle.getParam(Charm)===null)
            this.addCharmState(gameState);
        gameState.user.getParam(Charm).change(1);
        gameState.addObserver(this.resetCharm(gameState.user),GameStateFookTypes.roundInit);
    }
    protected _cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
    addCharmState(gameState: GameState){
        gameState.playerOracle.addNewParameter(new Charm(0));
    }
    resetCharm=(charaStates: OracleStates):(target:GameState)=>boolean=>{
        return (target:GameState)=>{
            charaStates.getParam(Charm).change(-1);
            return false;
        };
    }
}
export default new VisitBeautySalonScenario();