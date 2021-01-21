import _ from 'lodash'
import { Player,SubScenarioSpaceStateFookTypes } from "../CommonGameObjects"
import {GameState} from "./GameState"
import {MultiFookObservable} from "Utilities/ObservedState"
import { ScenarioContainer} from "GameRules/GameState/ScenarioContainer"
import { ScenarioCardState } from './ScenarioCardState'

class SubScenarioSpaceState extends MultiFookObservable<SubScenarioSpaceStateFookTypes>{
    #userSubScenarios: Array<ScenarioCardState>
    #opponentSubScenarios: Array<ScenarioCardState>

    constructor() {
        super();
        this.#userSubScenarios=[];
        this.#opponentSubScenarios=[];
    }
    getSubScenarios(player:Player.user|Player.opponent):Array<ScenarioCardState>{
        if(player===Player.user)
            return this.#userSubScenarios.filter(scenario=>true);
        if(player===Player.opponent)
            return this.#opponentSubScenarios.filter(scenario=>true);
    }
    addSubScenario(player:Player.user|Player.opponent,scenarioName:string,gamestate:GameState):void{
        if(this.has(scenarioName,player))
            return;
        if(player===Player.user)
            this.#userSubScenarios.push(new ScenarioCardState(scenarioName));
        if(player===Player.opponent)
            this.#opponentSubScenarios.push(new ScenarioCardState(scenarioName));
        ScenarioContainer.getSubScenario(scenarioName).setToSubScenarioSpace(gamestate,player);
        this.notifyObserver([SubScenarioSpaceStateFookTypes.valueChanged]);
    }
    removeSubScenario(player:Player.user|Player.opponent){
        //splice?
        this.notifyObserver([SubScenarioSpaceStateFookTypes.valueChanged]);
    }
    has(scenarioName:string,player:Player=null):boolean{
        if(player===Player.user)
            return this.#userSubScenarios.find(scenario=>scenario.scenarioName===scenarioName)!==undefined
        if(player===Player.opponent)
            return this.#opponentSubScenarios.find(scenario=>scenario.scenarioName===scenarioName)!==undefined
        return this.#userSubScenarios.find(scenario=>scenario.scenarioName===scenarioName)!==undefined
                ||this.#opponentSubScenarios.find(scenario=>scenario.scenarioName===scenarioName)!==undefined
    }
    roundInit(gamestate:GameState){
        
    }
}
export {SubScenarioSpaceState}