import { AttackPower } from "Utilities/Parameters/AttackPower";
import { DefensePower } from "Utilities/Parameters/DefensePower";
import { HitPoint } from "Utilities/Parameters/HitPoint";
import { GameState } from "../GameState/GameState";
import {MainScenarioInterface} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
import { MonsterStates } from "../GameState/MonsterStates";

class GoblinScenario implements MainScenarioInterface{
    readonly senarioName: string;
    readonly goblinState: MonsterStates;
    constructor(){
        this.senarioName="goblin";
        this.goblinState=new MonsterStates(
            new HitPoint(5),
            new AttackPower(2),
            new DefensePower(0)
        );
    }
    setToDeck(gameState: GameState): void {
        return;
    }
    prePlay(gameState: GameState): void {
    }
    payCost(gameState: GameState): boolean {
        return true;
    }
    doEffect(gameState: GameState): void {
        console.log("battle against goblin. but not yet implemented");
        if(ScenarioCommonFunctions.battle(gameState.playerOracle,this.goblinState)){
            gameState.playerOracle.getParam("goldAmount").change(2);
        }
    }
    cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
}
export default new GoblinScenario();