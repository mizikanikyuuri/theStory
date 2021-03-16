import _ from 'lodash'
import { Player, PlacedCardStateFookTypes, InitialPlayerStatus } from "../CommonGameObjects"
import { MultiFookObservable } from "Utilities/ObservedState"
import { GameParameter } from 'Utilities/Parameters/GameParameter'
class PlacedCardState extends MultiFookObservable<PlacedCardStateFookTypes>{
    scenarioName: string
    validity: "valid" | "invalid" = "valid";
    played: boolean = false;
    prePlayed: boolean = false;
    #params : {[s: string]: GameParameter<any> } = {};
    constructor(scenarioName) {
        super();
        this.scenarioName = scenarioName;
    }
    addNewParameter(newParameter: GameParameter<any>) {
        if (typeof this.#params[Object.getPrototypeOf(newParameter).constructor.paramName] !== "undefined")
            throw Error("Same name parameter cannnot be set");
        this.#params[Object.getPrototypeOf(newParameter).constructor.paramName] = newParameter;
    }
    getParam<ParamType extends GameParameter<any>>(typeProto: { paramName: string } & (new (...any) => ParamType)): ParamType {
        if (typeof this.#params[typeProto.paramName] === "undefined")
            return null;
        return this.#params[typeProto.paramName] as ParamType;
    }
    toString(): string {
        return Object.entries(this.#params).map(param => param[1].toString()).join();
    }
    getWebSocketFormattedParams(): WebSocketFormPlacedCardState {
        let returnValue={
            scenarioName: this.scenarioName,
            params:{}
        }
        Object.entries(this.#params).forEach(
            param => returnValue.params[param[0]] = param[1].toConstructParameter()
        );
        return returnValue;
    }
    getDisPlayParameters(): Object {
        let returnParameter = {};
        Object.entries(this.#params).forEach(
            param => returnParameter[param[0]] = param[1].toString()
        );
        return returnParameter;
    }
    static serealizer(state: PlacedCardState) {

    }
    static desrealizer(str: string) {

    }
}

type WebSocketFormPlacedCardState = {
    scenarioName: string;
    params: {[key:string]:Array<any>}
}
export { PlacedCardState,WebSocketFormPlacedCardState }