import { AttackPower } from "Utilities/Parameters/AttackPower";
import { DefensePower } from "Utilities/Parameters/DefensePower";
import { HitPoint } from "Utilities/Parameters/HitPoint";
import { GameState } from "../GameState/GameState";
import { MainScenarioInterface} from "../Scenario"
import { ScenarioCommonFunctions} from "../ScenarioUtilities"
import { MonsterStates } from "../GameState/MonsterStates";
class OrcScenario implements MainScenarioInterface{
    readonly senarioName: string;
    readonly orcState: MonsterStates;
    constructor(){
        this.senarioName="orc";
        this.orcState=new MonsterStates(
            new HitPoint(8),
            new AttackPower(3),
            new DefensePower(1)
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
        console.log("battle against orc. ");
        if(ScenarioCommonFunctions.battle(gameState.playerOracle,this.orcState)){
            gameState.playerOracle.getParam("goldAmount").change(4);
        }
    }
    cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
}
export default new OrcScenario();