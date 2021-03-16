import { GameParameter } from "./GameParameter"
enum GoldAmountParameterFookTypes {
    "valueChanged",
  }
class GoldAmount extends GameParameter<GoldAmountParameterFookTypes>{
    static readonly paramName="goldAmount";
    #goldAmount:number;
    constructor(defaultGoldAmount:number){
        super();
        this.set(defaultGoldAmount);
    }
    get current():number{
        return this.#goldAmount;
    }
    set(value:number){
        if(this.#goldAmount===value)
            return;
        if(value<0)
            this.#goldAmount=0;
        else
            this.#goldAmount=value;
        this.notifyObserver([GoldAmountParameterFookTypes.valueChanged]);
    }
    toString(): string {
        return this.#goldAmount.toString();
    }
    toConstructParameter(): Array<any> {
        return [this.#goldAmount];
    }
    change(amount:number){
        if(this.#goldAmount+amount<0)
            this.set(0);
        this.set(this.#goldAmount+amount);
    }

}
export{GoldAmount,GoldAmountParameterFookTypes}