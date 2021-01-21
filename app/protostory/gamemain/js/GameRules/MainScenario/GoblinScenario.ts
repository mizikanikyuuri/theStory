import { AttackPower } from "Utilities/Parameters/AttackPower";
import { DefensePower } from "Utilities/Parameters/DefensePower";
import { HitPoint } from "Utilities/Parameters/HitPoint";
import { GameState } from "../GameState/GameState";
import {MainAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
import { MonsterStates } from "../GameState/MonsterStates";
import { GoldAmount } from "Utilities/Parameters/GoldAmount";
import { Player } from "GameRules/CommonGameObjects";

class GoblinScenario extends MainAbstractScenario{
    readonly scenarioName: string;
    orcState: MonsterStates;
    constructor(){
        super();
        this.scenarioName="goblin";
        this.spawnGoblin();
    }
    private spawnGoblin(){
        this.orcState=new MonsterStates(
            new HitPoint(5),
            new AttackPower(2),
            new DefensePower(0)
        );
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
    }
    protected _payCost(gameState: GameState): boolean {
        return true;
    }
    protected _doEffect(gameState: GameState): void {
        console.log("battle against goblin.");
        if(ScenarioCommonFunctions.battle(gameState.playerOracle,this.orcState)){
            gameState.playerOracle.getParam(GoldAmount).change(2);
        }
    }
    protected _cleanUp(gameState:GameState):void{
        if(this.orcState.getParam(HitPoint).current===0)
            this.spawnGoblin();
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
}
export default new GoblinScenario();