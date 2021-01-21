import { GameParameter } from "./GameParameter"
enum SaintCaluseParameterFookTypes {
    "valueChanged",
  }
class SaintClause extends GameParameter<SaintCaluseParameterFookTypes>{
    static readonly paramName="saintClause";
    #saintClause:"valid"|"invalid";
    constructor(){
        super();
        this.deactivate();
    }
    get current():"valid"|"invalid"{
        return this.#saintClause;
    }
    toString(): string {
        return this.#saintClause.toString();
    }
    activate(){
        this.#saintClause="valid";
    }
    deactivate(){
        this.#saintClause="invalid";
    }

}
export{SaintClause,SaintCaluseParameterFookTypes}