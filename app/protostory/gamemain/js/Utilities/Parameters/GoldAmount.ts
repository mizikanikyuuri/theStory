import { GameParameter } from "./GameParameter"
import { GoldAmountParameterFookTypes } from "./ParameterFooks"
class GoldAmount extends GameParameter<GoldAmount, GoldAmountParameterFookTypes>{
    readonly paramName="goldAmount";
    #goldAmount:number;
    constructor(defaultGoldAmount:number){
        super();
        this.set(defaultGoldAmount);
    }
    get current():number{
        return this.#goldAmount;
    }
    set(value:number){
        if(value<0)
            throw Error("goldAmount can't be minus");
        if(this.#goldAmount===value)
            return;
        this.#goldAmount=value;
        this.notifyObserver(GoldAmountParameterFookTypes.valueChanged);
    }
    toString(): string {
        return this.#goldAmount.toString();
    }
    activateParameter() {
        throw new Error("Method not implemented.");
    }
    deactivateParameter() {
        throw new Error("Method not implemented.");
    }
    change(amount:number){
        if(this.#goldAmount+amount<0)
            this.set(0);
        this.set(this.#goldAmount+amount);
    }

}
export{GoldAmount}