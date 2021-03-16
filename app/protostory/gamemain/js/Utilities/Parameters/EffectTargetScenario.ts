import { GameParameter } from "./GameParameter"
enum EffectTargetScenarioFookTypes {
    "valueChanged",
  }
class EffectTargetScenario extends GameParameter< EffectTargetScenarioFookTypes>{
    static readonly paramName="effectTargetScenario";
    #targetList:Array<string>;
    constructor(targetList:Array<string>=[]){
        super();
        this.#targetList=targetList;
    }
    get targetList():Array<string>{
        return this.#targetList;
    }
    set targetList(targetList:Array<string>){
        this.#targetList=targetList;
        this.notifyObserver([EffectTargetScenarioFookTypes.valueChanged]);
    }
    toString(): string {
        return this.#targetList.join().toString();
    }
    toConstructParameter(): Array<any> {
        return [this.targetList];
    }
    addTarget(target:string){
        this.#targetList.push(target);
    }

}
export{EffectTargetScenario,EffectTargetScenarioFookTypes}