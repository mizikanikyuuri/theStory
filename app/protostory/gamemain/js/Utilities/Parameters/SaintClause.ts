import { GameParameter } from "./GameParameter"
enum SaintCaluseParameterFookTypes {
    "valueChanged",
  }
class SaintClause extends GameParameter<SaintCaluseParameterFookTypes>{
    static readonly paramName="saintClause";
    #saintClause:"valid"|"invalid";
    constructor(defaultState:"valid"|"invalid"="invalid"){
        super();
        if(defaultState==="valid")
            this.activate();
        else
            this.deactivate();
    }
    get current():"valid"|"invalid"{
        return this.#saintClause;
    }
    toString(): string {
        return this.#saintClause.toString();
    }
    toConstructParameter(): Array<any> {
        return [this.#saintClause];
    }
    activate(){
        this.#saintClause="valid";
    }
    deactivate(){
        this.#saintClause="invalid";
    }

}
export{SaintClause,SaintCaluseParameterFookTypes}