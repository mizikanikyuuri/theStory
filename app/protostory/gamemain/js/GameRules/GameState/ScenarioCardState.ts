import { AbstractScenario } from "GameRules/Scenario";
import { ScenarioContainer } from "./ScenarioContainer";

class ScenarioCardState{
    readonly #scenario:AbstractScenario
    constructor(scenarioName:string){
        this.#scenario=ScenarioContainer.getScenario(scenarioName);
    }
    get scenarioName():string{
        return this.#scenario.scenarioName;
    }
    getDisPlayParameters():Object{
        return this.#scenario.getDisPlayParameters();
    }
}
export {ScenarioCardState}