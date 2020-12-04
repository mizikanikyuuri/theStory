import {GameState} from "./GameState/GameState"
import ArbeitScenario from "./MainScenario/ArbeitScenario"
import SlimeScenario from "./MainScenario/SlimeScenario"
import PrayerScenario from "./MainScenario/PrayerScenario"
import BuyHerbScenario from "./MainScenario/BuyHerbScenario"
import SaintClauseScenario from "./MainScenario/SaintClauseScenario"
import GoblinScenario from "./MainScenario/GoblinScenario"
import OrcScenario from "./MainScenario/OrcScenario"
import GodPunishmentScenario from "./MainScenario/GodPunishmentScenario"
import BuySteelSwordScenario from "./MainScenario/BuySteelSwordScenario"
import HarbScenario from "./SubScenario/HarbScenario"
import SteelSwordScenario from "./SubScenario/SteelSwordScenario"
import _ from 'lodash'
const ScenarioFactory=new class{
    #scenarioList:Array<ScenarioInterface>
    #mainScenarioList:Array<MainScenarioInterface>
    #subScenarioList:Array<SubScenarioInterface>
    constructor(){
        this.#scenarioList=[];
        this.#mainScenarioList=[];
        this.#subScenarioList=[];
        this.#mainScenarioList.push(ArbeitScenario);
        this.#mainScenarioList.push(SlimeScenario);
        this.#mainScenarioList.push(PrayerScenario);
        this.#mainScenarioList.push(BuyHerbScenario);
        this.#mainScenarioList.push(GoblinScenario);
        this.#mainScenarioList.push(SaintClauseScenario);
        this.#mainScenarioList.push(OrcScenario);
        this.#mainScenarioList.push(GodPunishmentScenario);
        this.#mainScenarioList.push(BuySteelSwordScenario);
        this.#subScenarioList.push(HarbScenario);
        this.#subScenarioList.push(SteelSwordScenario);
    }
    getScenario(scenarioName:string):ScenarioInterface{
        const fullScenarioList = _.union(this.#scenarioList,this.#mainScenarioList,this.#subScenarioList);
        const returnScenario=fullScenarioList.find(scenario=>scenario.senarioName===scenarioName);
        if(returnScenario===undefined)
            throw Error("ScenarioFactory.getScenario can not found scenario:"+scenarioName);
        return returnScenario;
    }
    getMainScenario(scenarioName:string):MainScenarioInterface{
        const returnScenario=this.#mainScenarioList.find(scenario=>scenario.senarioName===scenarioName);
        if(returnScenario===undefined)
            throw Error("ScenarioFactory.getMainScenario can not found scenario:"+scenarioName);
        return returnScenario;
    }
    getSubScenario(scenarioName:string):SubScenarioInterface{
        const returnScenario=this.#subScenarioList.find(scenario=>scenario.senarioName===scenarioName);
        if(returnScenario===undefined)
            throw Error("ScenarioFactory.getSubScenario can not found scenario:"+scenarioName);
        return returnScenario;
    }
}
interface ScenarioInterface {
    readonly senarioName: string;
    prePlay(gameState:GameState):void;
    payCost(gameState:GameState):boolean;
    doEffect(gameState:GameState):void;
    cleanUp(gameState:GameState):void;
}
interface MainScenarioInterface extends ScenarioInterface{
    setToDeck(gameState:GameState):void;
}
interface SubScenarioInterface extends ScenarioInterface{
    setToSubScenarioSpace(gameState:GameState):void;
}


export {ScenarioInterface,MainScenarioInterface,SubScenarioInterface,ScenarioFactory}