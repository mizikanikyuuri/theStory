import { GameParameter } from "./GameParameter"
enum CharmParameterFookTypes {
    "valueChanged",
  }
class Charm extends GameParameter< CharmParameterFookTypes>{
    static readonly paramName="charm";
    #charm:number;
    constructor(defaultCharm:number){
        super();
        this.set(defaultCharm);
    }
    get current():number{
        return this.#charm;
    }
    set(value:number){
        if(value<0)
            throw Error("charm can't be minus");
        if(this.#charm===value)
            return;
        this.#charm=value;
        this.notifyObserver([CharmParameterFookTypes.valueChanged]);
    }
    toString(): string {
        return this.#charm.toString();
    }
    toConstructParameter(): Array<any> {
        return [this.current];
    }
    change(amount:number){
        if(this.#charm+amount<0)
            this.set(0);
        this.set(this.#charm+amount);
    }

}
export{CharmParameterFookTypes,Charm}