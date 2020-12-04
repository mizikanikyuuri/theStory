import _ from 'lodash'
import { Player,PlayerStateFookTypes,InitialPlayerStatus } from "../CommonGameObjects"
import {ObservedState,ObservedStateTrait} from "Utilities/ObservedState"
import { GameParameter } from 'Utilities/Parameters/GameParameter'
import {HitPoint} from "Utilities/Parameters/HitPoint"
import {AttackPower} from "Utilities/Parameters/AttackPower"
import {DefensePower} from "Utilities/Parameters/DefensePower"
import {GoldAmount} from "Utilities/Parameters/GoldAmount"
class OracleStates implements ObservedState<OracleStates,PlayerStateFookTypes>{
    #observedStateTrait:ObservedStateTrait<OracleStates,PlayerStateFookTypes>
    #params={};
    constructor() {
        this.#observedStateTrait=new ObservedStateTrait(this);
        this.addNewParameter(new HitPoint(InitialPlayerStatus.hitPoint));
        this.addNewParameter(new AttackPower(InitialPlayerStatus.attack));
        this.addNewParameter(new DefensePower(InitialPlayerStatus.defense));
        this.addNewParameter(new GoldAmount(InitialPlayerStatus.gold));
    }
    addObserver(fook: PlayerStateFookTypes, callBackFunc: (target: OracleStates) => void): void {
        this.#observedStateTrait.addObserver(fook,callBackFunc);
    }
    deleteObserver(fook: PlayerStateFookTypes, callBackFunc: (target: OracleStates) => void): void {
        this.#observedStateTrait.deleteObserver(fook,callBackFunc);
    }
    notifyObserver(fook: PlayerStateFookTypes): void {
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

export {OracleStates}