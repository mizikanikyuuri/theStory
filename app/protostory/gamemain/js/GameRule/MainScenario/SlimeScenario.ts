import { AttackPower } from "Utilities/Parameters/AttackPower";
import { DefensePower } from "Utilities/Parameters/DefensePower";
import { HitPoint } from "Utilities/Parameters/HitPoint";
import { GameState } from "../GameState/GameState";
import { MonsterStates } from "../GameState/MonsterStates";
import {MainScenarioInterface} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
class SlimeScenario implements MainScenarioInterface{
    readonly senarioName: string;
    readonly slimeState: MonsterStates;
    constructor(){
        this.senarioName="slime";
        this.slimeState=new MonsterStates(
            new HitPoint(3),
            new AttackPower(1),
            new DefensePower(0)
        );
    }
    setToDeck(gameState: GameState): void {
        return;
    }
    prePlay(gameState: GameState): void {
        return;
    }
    payCost(gameState: GameState): boolean {
        return true;
    }
    doEffect(gameState: GameState): void {
        console.log("battle against slime.");
        if(ScenarioCommonFunctions.battle(gameState.playerOracle,this.slimeState)){
            gameState.playerOracle.getParam("goldAmount").change(1);
        }
    }
    cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
}
export default new SlimeScenario();