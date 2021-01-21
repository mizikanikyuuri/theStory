import { CardSelectorProps } from 'Components/PopUp/CardSelector/CardSelector';
import _ from 'lodash'
import { ObservableInterface,Observable } from "Utilities/ObservedState"
interface InputQueue {
    getJsxProps: () => object
    callBack: (...any) => void
}
class SingleCardSelect extends Observable implements InputQueue{
    #cardList: Array<string>;
    constructor( cardList:Array<string>,callback:(cardName:string) => void){
        super();
        this.#cardList=cardList;
        this.callBack=callback.bind(this);
    }
    getJsxProps(): CardSelectorProps {
        return {
            callBack: this.callBack,
            cardList: this.#cardList,
        };
    }
    callBack: (cardName:string) => void

}
class InputQueueSet extends Set<InputQueue> implements ObservableInterface{
    #callBackFunctions: Array<(target: this) => void>
    constructor(){
        super();
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
    add(value: InputQueue): this{
        const returnValue=super.add(value);
        this.notifyObserver();
        return returnValue;
    }
    clear(): void{
        super.clear();
        this.notifyObserver();
    }
    delete(value: InputQueue): boolean{
        const returnValue=super.delete(value);
        this.notifyObserver();
        return returnValue;
    }
}
export { InputQueue ,SingleCardSelect
        ,InputQueueSet}