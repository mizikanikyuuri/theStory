interface ObservableInterface{
    addObserver( callBackFunc: (target: this) => void): void;
    deleteObserver(callBackFunc: (target: this) => void): void;
    notifyObserver():void;
}
interface MultiFookObservableInterface< FookTypes> extends ObservableInterface{
    addObserver(callBackFunc: (target: this,fook?: FookTypes) => void): void;
    deleteObserver(callBackFunc: (target: this) => void,fook?: FookTypes): void;
    notifyObserver(fookArray?: Array<FookTypes>):void;
}
class Observable implements ObservableInterface{
    #callBackFunctions: Array<(target: this) => void>
    constructor(){
        this.#callBackFunctions=[];
    }
    addObserver(callBackFunc: (target: this) => void): void {
        this.#callBackFunctions.push(callBackFunc);
    }
    deleteObserver(callBackFunc: (target: this) => void): void {
        const functionId = this.#callBackFunctions.indexOf(callBackFunc);
        if (functionId === -1)
            throw Error("ObservedStateTrait.deleteObserver could not found element " + callBackFunc);
        this.#callBackFunctions.splice(functionId, 1);
    }
    notifyObserver(): void {
        this.#callBackFunctions.forEach(callBackFunc => callBackFunc(this));
    }

}
class MultiFookObservable<FookTypes> extends Observable implements MultiFookObservableInterface<FookTypes>{
    #callBackFunctions: Array<[FookTypes, (target: this) => void]>
    constructor() {
        super();
        this.#callBackFunctions=[];
    }
    addObserver( callBackFunc: (target: this) => void,fook: FookTypes=null): void {
        this.#callBackFunctions.push([fook, callBackFunc]);
    }
    deleteObserver( callBackFunc: (target: this) => void,fook: FookTypes=null): void {
        const functionId = this.#callBackFunctions.indexOf([fook, callBackFunc]);
        if (functionId === -1)
            throw Error("ObservedStateTrait.deleteObserver could not found element " + callBackFunc);
        this.#callBackFunctions.splice(functionId, 1);
    }
    notifyObserver(fookArray: Array<FookTypes>=null):void {
        this.#callBackFunctions.filter(callBackFuncArray => fookArray.includes(callBackFuncArray[0])||callBackFuncArray[0] === null)
            .forEach(callBackFuncArray => callBackFuncArray[1](this));
    }
}
export{ObservableInterface, MultiFookObservableInterface,Observable,MultiFookObservable}