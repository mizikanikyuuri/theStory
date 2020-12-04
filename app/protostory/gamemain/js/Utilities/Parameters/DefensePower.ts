import { GameParameter } from "./GameParameter"
import { DefensePowerParameterFookTypes } from "./ParameterFooks"
class DefensePower extends GameParameter<DefensePower, DefensePowerParameterFookTypes>{
    readonly paramName="defensePower";
    #defensePower:number;
    constructor(defaultDefensePower:number){
        super();
        this.set(defaultDefensePower);
    }
    get current():number{
        return this.#defensePower;
    }
    set(value:number){
        if(value<0)
            throw Error("defensePower can't be minus");
        if(this.#defensePower===value)
            return;
        this.#defensePower=value;
        this.notifyObserver(DefensePowerParameterFookTypes.valueChanged);
    }
    toString(): string {
        return this.#defensePower.toString();
    }
    activateParameter() {
        throw new Error("Method not implemented.");
    }
    deactivateParameter() {
        throw new Error("Method not implemented.");
    }
    change(amount:number){
        if(this.#defensePower+amount<0)
            this.set(0);
        this.set(this.#defensePower+amount);
    }

}
export{DefensePower}