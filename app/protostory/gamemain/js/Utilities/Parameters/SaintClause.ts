import { GameParameter } from "./GameParameter"
import { SaintCaluseParameterFookTypes } from "./ParameterFooks"
class SaintClause extends GameParameter<SaintClause, SaintCaluseParameterFookTypes>{
    readonly paramName="saintClause";
    #saintClause:"valid"|"invalid";
    constructor(defaultSaintClause:"valid"|"invalid"){
        super();
        this.set(defaultSaintClause);
    }
    get current():"valid"|"invalid"{
        return this.#saintClause;
    }
    set(value:"valid"|"invalid"){
        this.#saintClause=value;
    }
    toString(): string {
        return this.#saintClause.toString();
    }
    activateParameter() {
        throw new Error("Method not implemented.");
    }
    deactivateParameter() {
        throw new Error("Method not implemented.");
    }
    activate(amount:number){
        this.set("valid")
    }
    deactivate(){
        this.set("invalid");
    }

}
export{SaintClause}