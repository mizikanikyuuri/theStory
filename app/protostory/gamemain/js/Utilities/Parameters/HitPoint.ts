import { GameParameter } from "./GameParameter"
import { HitPointParameterFookTypes } from "./ParameterFooks"
class HitPoint extends GameParameter<HitPoint, HitPointParameterFookTypes>{
    readonly paramName="hitPoint";
    #currentHitPoint:number;
    #maxHitPoint:number;
    constructor(defaultHitPoint:number,defaultMaxHitPoint:number=null,){
        super();
        if(defaultMaxHitPoint===null)
            this.setMax(defaultHitPoint);
        else
            this.setMax(defaultMaxHitPoint);
        this.set(defaultHitPoint);
    }
    get current():number{
        return this.#currentHitPoint;
    }
    get max():number{
        return this.#maxHitPoint;
    }
    setMax(value:number){
        if(value<0)
            throw Error("MaxHitPoint can't be minus");
        this.#maxHitPoint=value;
        if(this.#currentHitPoint!==null&&value<this.#currentHitPoint)
            this.set(value);
    }
    set(value:number){
        if(value<0)
            throw Error("HitPoint can't be minus");
        if(this.#currentHitPoint===value)
            return;
        if(value>this.#maxHitPoint){
            this.#currentHitPoint=this.#maxHitPoint;
            return;
        }
        this.#currentHitPoint=value;
        this.notifyObserver(HitPointParameterFookTypes.valueChanged);
        if(this.#currentHitPoint===0)
            this.notifyObserver(HitPointParameterFookTypes.isZero);
    }
    toString(): string {
        return this.#currentHitPoint+"/"+this.#maxHitPoint;
    }
    activateParameter() {
        throw new Error("Method not implemented.");
    }
    deactivateParameter() {
        throw new Error("Method not implemented.");
    }
    change(amount:number){
        if(this.#currentHitPoint+amount<0)
            this.set(0);
        else
            this.set(this.#currentHitPoint+amount);
    }

}
export{HitPoint}