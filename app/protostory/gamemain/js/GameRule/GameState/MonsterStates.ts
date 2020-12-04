import _ from 'lodash'
import { MonsterStateFookTypes } from "../CommonGameObjects"
import {ObservedState,ObservedStateTrait} from "Utilities/ObservedState"
import { GameParameter } from 'Utilities/Parameters/GameParameter'
import {HitPoint} from "Utilities/Parameters/HitPoint"
import {AttackPower} from "Utilities/Parameters/AttackPower"
import {DefensePower} from "Utilities/Parameters/DefensePower"
class MonsterStates implements ObservedState<MonsterStates,MonsterStateFookTypes>{
    #observedStateTrait:ObservedStateTrait<MonsterStates,MonsterStateFookTypes>
    #params={};
    constructor(hitPoint:HitPoint,attackPower:AttackPower,defensePower:DefensePower) {
        this.#observedStateTrait=new ObservedStateTrait(this);
        this.addNewParameter(hitPoint);
        this.addNewParameter(attackPower);
        this.addNewParameter(defensePower);
    }
    addObserver(fook: MonsterStateFookTypes, callBackFunc: (target: MonsterStates) => void): void {
        this.#observedStateTrait.addObserver(fook,callBackFunc);
    }
    deleteObserver(fook: MonsterStateFookTypes, callBackFunc: (target: MonsterStates) => void): void {
        this.#observedStateTrait.deleteObserver(fook,callBackFunc);
    }
    notifyObserver(fook: MonsterStateFookTypes): void {
        this.#observedStateTrait.notifyObserver(fook);
    }
    addNewParameter(newParameter:GameParameter<any,any>){
        if(typeof this.#params[newParameter.paramName]!=="undefined")
            throw Error("Same name parameter cannnot be set");
        this.#params[newParameter.paramName]=newParameter;
    }
    getParam(paramName:string){
        if(typeof this.#params[paramName]==="undefined")
            return null;
        return this.#params[paramName];
    }
    toString():string{
        return Object.entries(this.#params).map(param=>param[1].toString()).join();
    }
    getDisPlayParameters():object{
        let returnParameter={};
        Object.entries(this.#params).forEach(
            param=>returnParameter[param[0]]=param[1].toString()
        );
        return returnParameter;
    }
}

export {MonsterStates}