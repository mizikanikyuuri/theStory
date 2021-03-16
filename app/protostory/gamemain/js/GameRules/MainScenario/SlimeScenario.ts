import { Player } from "GameRules/CommonGameObjects";
import { AttackPower } from "Utilities/Parameters/AttackPower";
import { DefensePower } from "Utilities/Parameters/DefensePower";
import { GoldAmount } from "Utilities/Parameters/GoldAmount";
import { HitPoint } from "Utilities/Parameters/HitPoint";
import { GameState } from "../GameState/GameState";
import { MonsterStates } from "../GameState/GameCharacter/MonsterStates";
import {MainAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class SlimeScenario extends MainAbstractScenario{
    readonly scenarioName: string;
    slimeState: MonsterStates;
    constructor(){
        super();
        this.scenarioName="slime";
        this.spawnSlime();
    }
    private spawnSlime(){
        this.slimeState=new MonsterStates(
            new HitPoint(3),
            new AttackPower(1),
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
        return;
    }
    protected _payCost(gameState: GameState): boolean {
        return true;
    }
    protected _doEffect(gameState: GameState): void {
        console.log("battle against slime.");
        if(ScenarioCommonFunctions.battle(gameState.playerOracle,this.slimeState)){
            gameState.playerOracle.getParam(GoldAmount).change(1);
        }
    }
    protected _cleanUp(gameState:GameState):void{
        if(this.slimeState.getParam(HitPoint).current===0)
            this.spawnSlime();
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
}
export default new SlimeScenario();