
import _ from "lodash"
//main cards
import RedDragonScenario from "GameRules/MainScenario/RedDragonScenario"
import ArbeitScenario from "GameRules/MainScenario/ArbeitScenario"
import SlimeScenario from "GameRules/MainScenario/SlimeScenario"
import PrayerScenario from "GameRules/MainScenario/PrayerScenario"
import BuyHerbScenario from "GameRules/MainScenario/BuyHerbScenario"
import SaintClauseScenario from "GameRules/MainScenario/SaintClauseScenario"
import GoblinScenario from "GameRules/MainScenario/GoblinScenario"
import OrcScenario from "GameRules/MainScenario/OrcScenario"
import GodPunishmentScenario from "GameRules/MainScenario/GodPunishmentScenario"
import BuySteelSwordScenario from "GameRules/MainScenario/BuySteelSwordScenario"
import StayChildGirlScenario from "GameRules/MainScenario/StayChildGirlScenario"
import BuySteelArmorScenario from "GameRules/MainScenario/BuySteelArmorScenario"
import BuyDragonKillerScenario from "GameRules/MainScenario/BuyDragonKillerScenario"
import HarbScenario from "GameRules/SubScenario/HarbScenario"
import SteelSwordScenario from "GameRules/SubScenario/SteelSwordScenario"
import SteelArmorScenario from "GameRules/SubScenario/SteelArmorScenario"
import DragonKillerScenario from "GameRules/SubScenario/DragonKillerScenario"

//tutorial only cards
import LazeScenario from "GameRules/MainScenario/LazeScenario"
import SleepTwiceScenario from "GameRules/MainScenario/SleepTwiceScenario"
import BuyFormalWearScenario from "GameRules/MainScenario/BuyFormalWearScenario"
import VisitWizeOldMenScenario from"GameRules/MainScenario/VisitWizeOldMenScenario"
import VisitBeautySalonScenario from "GameRules/MainScenario/VisitBeautySalonScenario"
import GiveBribeScenario from "GameRules/MainScenario/GiveBribeScenario"
import WizeOldMenAdviceScenario from"GameRules/SubScenario/WizeOldMenAdviceScenario"
import FormalWearScenario from "GameRules/SubScenario/FormalWearScenario"
import CozyRelationshipScenario from "GameRules/SubScenario/CozyRelationshipScenario"
import { AbstractScenario,ScenarioFooks, MainAbstractScenario, SubAbstractScenario } from "GameRules/Scenario"
const ScenarioContainer = new class {
    #scenarioList: Array<AbstractScenario>
    #mainScenarioList: Array<MainAbstractScenario>
    #subScenarioList: Array<SubAbstractScenario>
    constructor() {
        this.#scenarioList = [];
        this.#mainScenarioList = [];
        this.#subScenarioList = [];
        this.#mainScenarioList.push(RedDragonScenario);
        this.#mainScenarioList.push(ArbeitScenario);
        this.#mainScenarioList.push(SlimeScenario);
        this.#mainScenarioList.push(PrayerScenario);
        this.#mainScenarioList.push(BuyHerbScenario);
        this.#mainScenarioList.push(GoblinScenario);
        this.#mainScenarioList.push(SaintClauseScenario);
        this.#mainScenarioList.push(OrcScenario);
        this.#mainScenarioList.push(GodPunishmentScenario);
        this.#mainScenarioList.push(BuySteelSwordScenario);
        this.#mainScenarioList.push(StayChildGirlScenario);
        this.#mainScenarioList.push(BuySteelArmorScenario);
        this.#mainScenarioList.push(BuyDragonKillerScenario);
        this.#mainScenarioList.push(LazeScenario);
        this.#mainScenarioList.push(SleepTwiceScenario);
        this.#mainScenarioList.push(BuyFormalWearScenario);
        this.#mainScenarioList.push(VisitBeautySalonScenario);
        this.#mainScenarioList.push(VisitWizeOldMenScenario);
        this.#mainScenarioList.push(GiveBribeScenario);

        this.#subScenarioList.push(HarbScenario);
        this.#subScenarioList.push(SteelSwordScenario);
        this.#subScenarioList.push(SteelArmorScenario);
        this.#subScenarioList.push(DragonKillerScenario);
        this.#subScenarioList.push(WizeOldMenAdviceScenario);
        this.#subScenarioList.push(FormalWearScenario);
        this.#subScenarioList.push(CozyRelationshipScenario);
    }
    getScenario(scenarioName: string): AbstractScenario {
        const fullScenarioList = _.union(this.#scenarioList, this.#mainScenarioList, this.#subScenarioList);
        const returnScenario = fullScenarioList.find(scenario => scenario.scenarioName === scenarioName);
        if (returnScenario === undefined)
            throw Error("ScenarioFactory.getScenario can not found scenario:" + scenarioName);
        return returnScenario;
    }
    getMainScenario(scenarioName: string): MainAbstractScenario {
        const returnScenario = this.#mainScenarioList.find(scenario => scenario.scenarioName === scenarioName);
        if (returnScenario === undefined)
            throw Error("ScenarioFactory.getMainScenario can not found scenario:" + scenarioName);
        return returnScenario;
    }
    getSubScenario(scenarioName: string): SubAbstractScenario {
        const returnScenario = this.#subScenarioList.find(scenario => scenario.scenarioName === scenarioName);
        if (returnScenario === undefined)
            throw Error("ScenarioFactory.getSubScenario can not found scenario:" + scenarioName);
        return returnScenario;
    }
}

export { ScenarioContainer }