
import {ObservedState,ObservedStateTrait} from "../ObservedState"
class GameParameter<TargetType, FookTypes> implements ObservedState<GameParameter<TargetType, FookTypes>, FookTypes> {
    readonly paramName: string;
    #observedStateTrait:ObservedStateTrait<GameParameter<TargetType, FookTypes>,FookTypes>
    constructor() {
        this.#observedStateTrait=new ObservedStateTrait(this);
    }
    addObserver(fook: FookTypes, callBackFunc: (target: GameParameter<TargetType, FookTypes>) => void): void {
        this.#observedStateTrait.addObserver(fook,callBackFunc);
    }
    deleteObserver(fook: FookTypes, callBackFunc: (target: GameParameter<TargetType, FookTypes>) => void): void {
        this.#observedStateTrait.deleteObserver(fook,callBackFunc);
    }
    notifyObserver(fook: FookTypes): void {
        this.#observedStateTrait.notifyObserver(fook);
    }
    toString():string{
        throw new Error("Method not implemented.");
    }
    activateParameter(){
        throw new Error("Method not implemented.");
    }
    deactivateParameter(){
        throw new Error("Method not implemented.");
    }
}
export {GameParameter}