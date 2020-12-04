interface ObservedState<TargetType, FookTypes> {
    addObserver(fook: FookTypes, callBackFunc: (target: TargetType) => void): void;
    deleteObserver(fook: FookTypes, callBackFunc: (target: TargetType) => void): void;
    notifyObserver(fook: FookTypes):void;
}
class ObservedStateTrait<TargetType, FookTypes> implements ObservedState<TargetType, FookTypes>{
    #callBackFunctions: Array<[FookTypes, (target: TargetType) => void]>
    readonly target
    constructor(target: TargetType) {
        this.target = target;
        this.#callBackFunctions = [];
    }
    addObserver(fook: FookTypes, callBackFunc: (target: TargetType) => void): void {
        this.#callBackFunctions.push([fook, callBackFunc]);
    }
    deleteObserver(fook: FookTypes, callBackFunc: (target: TargetType) => void): void {
        const functionId = this.#callBackFunctions.indexOf([fook, callBackFunc]);
        if (functionId === -1)
            throw SyntaxError("ObservedStateTrait.deleteObserver could not found element " + callBackFunc);
        this.#callBackFunctions.splice(functionId, 1);
    }
    notifyObserver(fook: FookTypes):void {
        this.#callBackFunctions.filter(callBackFunc => callBackFunc[0] === fook)
            .forEach(callBackFunc => callBackFunc[1](this.target));
    }
}
export{ObservedState, ObservedStateTrait}