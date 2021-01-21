import _ from 'lodash'
import { Player,PlayerStateFookTypes,InitialPlayerStatus } from "../CommonGameObjects"
import { MultiFookObservable } from "Utilities/ObservedState"
import { GameParameter } from 'Utilities/Parameters/GameParameter'
import {HitPoint} from "Utilities/Parameters/HitPoint"
import {AttackPower} from "Utilities/Parameters/AttackPower"
import {DefensePower} from "Utilities/Parameters/DefensePower"
import {GoldAmount} from "Utilities/Parameters/GoldAmount"
class OracleStates extends MultiFookObservable<PlayerStateFookTypes>{
    #params={};
    constructor() {
        super();
        this.addNewParameter(new HitPoint(InitialPlayerStatus.hitPoint));
        this.addNewParameter(new AttackPower(InitialPlayerStatus.attack));
        this.addNewParameter(new DefensePower(InitialPlayerStatus.defense));
        this.addNewParameter(new GoldAmount(InitialPlayerStatus.gold));
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

export {OracleStates}