
import {MultiFookObservable} from "../ObservedState"
abstract class GameParameter<FookTypes> extends MultiFookObservable<FookTypes> {
    static readonly paramName: string;
    constructor() {
        super();
    }
    abstract toString():string;
    abstract toConstructParameter():Array<any>;
}
export {GameParameter}