import { AttackPower } from "Utilities/Parameters/AttackPower";
import { DefensePower } from "Utilities/Parameters/DefensePower";
import { HitPoint ,HitPointParameterFookTypes} from "Utilities/Parameters/HitPoint";
import { GameState } from "../GameState/GameState";
import { MainAbstractScenario} from "../Scenario";
import { ScenarioCommonFunctions} from "../ScenarioUtilities";
import { MonsterStates } from "../GameState/GameCharacter/MonsterStates";
import { Player } from "GameRules/CommonGameObjects";
class RedDragonScenario extends MainAbstractScenario{
    readonly scenarioName: string;
    readonly redDragonState: MonsterStates;
    constructor(){
        super();
        this.scenarioName="redDragon";
        this.redDragonState=new MonsterStates(
            new HitPoint(30),
            new AttackPower(10),
            new DefensePower(5)
        );
    }
    protected  _setToDeck(gameState: GameState): void {
        this.redDragonState.getParam(HitPoint).addObserver(
            (hitPoint)=>{
                if (hitPoint.current===0)
                gameState.winner=gameState.playSpaceState.player;
            }
            ,HitPointParameterFookTypes.isZero);
        return;
    }
    protected _placeCard(gameState: GameState,player:Player.user|Player.opponent): void {
        this._placeCardWithState(gameState,player);
    }
    protected _placeCardWithState(gameState: GameState,player:Player.user|Player.opponent,props:{}={}): void{
        gameState.playSpaceState.addCard(player, this.scenarioName);
    }
    protected _prePlay(gameState: GameState): void {
    }
    protected _payCost(gameState: GameState): boolean {
        return true;
    }
    protected _doEffect(gameState: GameState): void {
        console.log("battle against redDragon. ");
        ScenarioCommonFunctions.battle(gameState.playerOracle,this.redDragonState);
    }
    protected _cleanUp(gameState:GameState):void{
        return;
    }
}
export default new RedDragonScenario();