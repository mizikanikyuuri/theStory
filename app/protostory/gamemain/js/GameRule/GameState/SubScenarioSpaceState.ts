import _ from 'lodash'
import { Player,SubScenarioSpaceStateFookTypes } from "../CommonGameObjects"
import {GameState} from "../GameState/GameState"
import {ObservedState,ObservedStateTrait} from "Utilities/ObservedState"
import { ScenarioFactory,SubScenarioInterface} from "../Scenario"

class SubScenarioSpaceState implements ObservedState<SubScenarioSpaceState,SubScenarioSpaceStateFookTypes>{
    #userSubScenarios: Array<string>
    #opponentSubScenarios: Array<string>
    #observedStateTrait:ObservedStateTrait<SubScenarioSpaceState,SubScenarioSpaceStateFookTypes>
    addObserver=(fook: SubScenarioSpaceStateFookTypes, callBackFunc: (target: SubScenarioSpaceState) => void)=>{
        this.#observedStateTrait.addObserver(fook,callBackFunc);
    }
    deleteObserver=(fook: SubScenarioSpaceStateFookTypes, callBackFunc: (target: SubScenarioSpaceState) => void)=>{
        this.#observedStateTrait.deleteObserver(fook,callBackFunc);
    }
    notifyObserver=(fook: SubScenarioSpaceStateFookTypes)=>{
        this.#observedStateTrait.notifyObserver(fook);
    }

    constructor() {
        this.#observedStateTrait=new ObservedStateTrait(this);
        this.#userSubScenarios=[];
        this.#opponentSubScenarios=[];
    }
    getSubScenarios(player:Player.user|Player.opponent){
        if(player===Player.user)
            return this.#userSubScenarios.filter(scenario=>true);
        if(player===Player.opponent)
            return this.#opponentSubScenarios.filter(scenario=>true);
    }
    addSubScenario(player:Player.user|Player.opponent,scenarioName:string,gamestate:GameState):void{
        if(player===Player.user)
            this.#userSubScenarios.push(scenarioName);
        if(player===Player.opponent)
            this.#opponentSubScenarios.push(scenarioName);
        ScenarioFactory.getSubScenario(scenarioName).setToSubScenarioSpace(gamestate);
        this.notifyObserver(SubScenarioSpaceStateFookTypes.valueChanged);
    }
    removeSubScenario(player:Player.user|Player.opponent){
        //splice?
        this.notifyObserver(SubScenarioSpaceStateFookTypes.valueChanged);
    }
    roundInit(gamestate:GameState){
        
    }
}
export {SubScenarioSpaceState}