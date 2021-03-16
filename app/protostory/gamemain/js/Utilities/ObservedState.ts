
/**
 * observable function use argument observable target.
 * return value means deny observe. return false remove function from call back Array
 */
type ObservableCallBackFunc<T> = (target: T) => boolean|void;
type ObservableCallBackFuncWithAppend<T> = (target: T,appned?) => boolean|void;

interface ObservableInterface{
    addObserver( callBackFunc: ObservableCallBackFunc<this>): void;
    deleteObserver(callBackFunc: ObservableCallBackFunc<this>): void;
    notifyObserver():void;
}
interface MultiFookObservableInterface< FookTypes> extends ObservableInterface{
    addObserver(callBackFunc: ObservableCallBackFunc<this>): void;
    deleteObserver(callBackFunc: ObservableCallBackFuncWithAppend<this>,fook?: FookTypes): void;
    notifyObserver(fookArray?: Array<FookTypes>):void;
}

class Observable implements ObservableInterface{
    #callBackFunctions: Array<ObservableCallBackFunc<this>>
    constructor(){
        this.#callBackFunctions=[];
    }
    addObserver(callBackFunc: ObservableCallBackFunc<this>): void {
        this.#callBackFunctions.push(callBackFunc);
    }
    deleteObserver(callBackFunc: ObservableCallBackFunc<this>): void {
        const functionId = this.#callBackFunctions.indexOf(callBackFunc);
        if (functionId === -1)
            throw Error("ObservedStateTrait.deleteObserver could not found element " + callBackFunc);
        this.#callBackFunctions.splice(functionId, 1);
    }
    notifyObserver(): void {
        this.#callBackFunctions.forEach(
                (callBackFunc) =>{
                    if(callBackFunc(this)===false)
                        this.deleteObserver(callBackFunc);
                } 
            );
    }

}
class MultiFookObservable<FookTypes> extends Observable implements MultiFookObservableInterface<FookTypes>{
    #callBackFunctions: Array<[FookTypes, ObservableCallBackFuncWithAppend<this>]>
    constructor() {
        super();
        this.#callBackFunctions=[];
    }
    addObserver( callBackFunc: ObservableCallBackFuncWithAppend<this>,fook: FookTypes=null): void {
        this.#callBackFunctions.push([fook, callBackFunc]);
    }
    deleteObserver( callBackFunc: ObservableCallBackFuncWithAppend<this>,fook: FookTypes=null): void {
        const functionId = this.#callBackFunctions.indexOf([fook, callBackFunc]);
        if (functionId === -1)
            throw Error("ObservedStateTrait.deleteObserver could not found element " + callBackFunc);
        this.#callBackFunctions.splice(functionId, 1);
    }
    notifyObserver(fookArray: Array<FookTypes>=null,append={}):void {
        if(fookArray==null){
            this.#callBackFunctions.forEach(
                (callBackFuncArray) =>{
                    if(callBackFuncArray[1](this,append)===false){
                        this.deleteObserver(callBackFuncArray[1]);
                    }
                }
            );
            return;
        }
        this.#callBackFunctions.filter(callBackFuncArray => fookArray.includes(callBackFuncArray[0])||callBackFuncArray[0] === null)
            .forEach(
                (callBackFuncArray) => {
                    if(callBackFuncArray[1](this,append)===false){
                        this.deleteObserver(callBackFuncArray[1]);
                    }
                }
            );
    }
}
export{ObservableInterface, MultiFookObservableInterface,Observable,MultiFookObservable}