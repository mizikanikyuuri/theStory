import _ from 'lodash'
import { MonsterStateFookTypes } from "../CommonGameObjects"
import {MultiFookObservable} from "Utilities/ObservedState"
import { GameParameter } from 'Utilities/Parameters/GameParameter'
import {HitPoint} from "Utilities/Parameters/HitPoint"
import {AttackPower} from "Utilities/Parameters/AttackPower"
import {DefensePower} from "Utilities/Parameters/DefensePower"
class MonsterStates extends MultiFookObservable<MonsterStateFookTypes>{
    #params={};
    constructor(hitPoint:HitPoint,attackPower:AttackPower,defensePower:DefensePower) {
        super();
        this.addNewParameter(hitPoint);
        this.addNewParameter(attackPower);
        this.addNewParameter(defensePower);
    }
    addNewParameter(newParameter:GameParameter<any>){
        if(typeof this.#params[Object.getPrototypeOf(newParameter).constructor.paramName]!=="undefined")
            throw Error("Same name parameter cannnot be set");
        this.#params[Object.getPrototypeOf(newParameter).constructor.paramName]=newParameter;
    }
    getParam<ParamType extends GameParameter<any>>(typeProto: {paramName:string} &(new (...any) => ParamType) ): ParamType{
        if(typeof this.#params[typeProto.paramName]==="undefined")
            return null;
        return this.#params[typeProto.paramName];
    }
    toString():string{
        return Object.entries(this.#params).map(param=>param[1].toString()).join();
    }
    getDisPlayParameters():Object{
        let returnParameter={};
        Object.entries(this.#params).forEach(
            param=>returnParameter[param[0]]=param[1].toString()
        );
        return returnParameter;
    }
}

export {MonsterStates}