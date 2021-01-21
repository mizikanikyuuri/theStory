import { GameParameter } from "./GameParameter"
enum AttackPowerParameterFookTypes {
    "valueChanged",
  }
class AttackPower extends GameParameter< AttackPowerParameterFookTypes>{
    static readonly paramName="attackPower";
    #attackPower:number;
    constructor(defaultAttackPower:number){
        super();
        this.set(defaultAttackPower);
    }
    get current():number{
        return this.#attackPower;
    }
    set(value:number){
        if(value<0)
            throw Error("attackPower can't be minus");
        if(this.#attackPower===value)
            return;
        this.#attackPower=value;
        this.notifyObserver([AttackPowerParameterFookTypes.valueChanged]);
    }
    toString(): string {
        return this.#attackPower.toString();
    }
    change(amount:number){
        if(this.#attackPower+amount<0)
            this.set(0);
        this.set(this.#attackPower+amount);
    }

}
export{AttackPower,AttackPowerParameterFookTypes}