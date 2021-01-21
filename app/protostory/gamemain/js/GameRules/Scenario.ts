import { GameState } from "./GameState/GameState"
import _ from 'lodash'
import { MultiFookObservable} from "Utilities/ObservedState"
import { Player } from "./CommonGameObjects";

enum ScenarioFooks {
    "onPlace",
    "onPrePlay",
    "onPayCost",
    "onDoEffect",
    "onCleanUp",
    "onSetToDeck",
    "onSetToSubScenarioSpace",
}
abstract class AbstractScenario extends MultiFookObservable<ScenarioFooks>{
    readonly scenarioName: string;
    constructor() {
        super();
    }
    placeCard(gameState: GameState,player:Player.user|Player.opponent): void{
        this.notifyObserver([ScenarioFooks.onPlace]);
        this._placeCard(gameState,player);
    }
    placeCardWithState(gameState: GameState,player:Player.user|Player.opponent,props:{}): void{
        this.notifyObserver([ScenarioFooks.onPlace]);
        this._placeCardWithState(gameState,player,props);
    }
    prePlay(gameState: GameState): void{   
        this.notifyObserver([ScenarioFooks.onPrePlay]);
        this._prePlay(gameState);
    }
    payCost(gameState: GameState): void{   
        this.notifyObserver([ScenarioFooks.onPayCost]);
        this._payCost(gameState);
    }
    doEffect(gameState: GameState): void{   
        this.notifyObserver([ScenarioFooks.onDoEffect]);
        this._doEffect(gameState);
    }
    cleanUp(gameState: GameState): void{   
        this.notifyObserver([ScenarioFooks.onCleanUp]);
        this._cleanUp(gameState);
    }
    getDisPlayParameters():Object{
        let returnParameter={};
        Object.entries(this).filter(([key,value])=>typeof value!=="function"&&key!=="scenarioName").forEach(
            ([key,value])=>returnParameter[key]=value.toString()
        );
        return returnParameter;
    }
    protected abstract _placeCard(gameState: GameState,player:Player.user|Player.opponent): void;
    protected abstract _placeCardWithState(gameState: GameState,player:Player.user|Player.opponent,props:{}): void;
    protected abstract _prePlay(gameState: GameState): void;
    protected abstract _payCost(gameState: GameState): boolean;
    protected abstract _doEffect(gameState: GameState): void;
    protected abstract _cleanUp(gameState: GameState): void;


}
abstract class MainAbstractScenario extends AbstractScenario {
    setToDeck(gameState: GameState): void{
        this.notifyObserver([ScenarioFooks.onSetToDeck]);
        this._setToDeck(gameState);
    }
    protected abstract _setToDeck(gameState: GameState): void;
}
abstract class SubAbstractScenario extends AbstractScenario {
    setToSubScenarioSpace(gameState: GameState,player:Player): void{
        this.notifyObserver([ScenarioFooks.onSetToDeck]);
        this._setToSubScenarioSpace(gameState,player);
    }
    protected abstract _setToSubScenarioSpace(gameState: GameState,player:Player): void;
}

export { AbstractScenario,ScenarioFooks, MainAbstractScenario, SubAbstractScenario }