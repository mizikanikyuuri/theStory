import { GameParameter } from "./GameParameter"
enum DefensePowerParameterFookTypes {
    "valueChanged",
  }
class DefensePower extends GameParameter<DefensePowerParameterFookTypes>{
    static readonly paramName="defensePower";
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
        this.notifyObserver([DefensePowerParameterFookTypes.valueChanged]);
    }
    toString(): string {
        return this.#defensePower.toString();
    }
    toConstructParameter(): Array<any> {
        return [this.current];
    }
    change(amount:number){
        if(this.#defensePower+amount<0)
            this.set(0);
        this.set(this.#defensePower+amount);
    }

}
export{DefensePower,DefensePowerParameterFookTypes}