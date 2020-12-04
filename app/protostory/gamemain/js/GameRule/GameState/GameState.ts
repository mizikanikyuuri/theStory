import _ from 'lodash'
import { Player, GameStateFookTypes, DeckSpaceStateFookTypes,PlaySpaceStateFookTypes,SubScenarioSpaceStateFookTypes, InitialPlayerStatus } from "../CommonGameObjects"
import { PlaySpaceState, PlacedCardState } from "./PlaySpaceState"
import { DeckSpaceState } from "./DeckSpaceState"
import { SubScenarioSpaceState } from "./SubScenarioSpaceState"
import { ObservedState,ObservedStateTrait } from "Utilities/ObservedState"
import { OracleStates } from './OracleStates'
class GameState implements ObservedState<GameState, GameStateFookTypes>{
    #state = {
    };
    readonly playSpaceState: PlaySpaceState
    readonly deckSpaceState: DeckSpaceState
    readonly subScenarioSpaceState: SubScenarioSpaceState
    readonly user =new OracleStates();
    readonly opponent= new OracleStates();
    #observedStateTrait: ObservedStateTrait<GameState, GameStateFookTypes>
    addObserver=(fook: GameStateFookTypes, callBackFunc: (target: GameState) => void)=>{
        this.#observedStateTrait.addObserver(fook,callBackFunc);
    }
    deleteObserver=(fook: GameStateFookTypes, callBackFunc: (target: GameState) => void)=>{
        this.#observedStateTrait.deleteObserver(fook,callBackFunc);
    }
    notifyObserver=(fook: GameStateFookTypes)=>{
        this.#observedStateTrait.notifyObserver(fook);
    }
    constructor(updateDisplayStatusFunc: (status: GameState) => void) {
        this.#observedStateTrait=new ObservedStateTrait(this);
        this.playSpaceState = new PlaySpaceState();
        this.deckSpaceState = new DeckSpaceState(this);
        this.subScenarioSpaceState = new SubScenarioSpaceState();
        this.addObserver(GameStateFookTypes.valueChanged, updateDisplayStatusFunc);
        this.playSpaceState.addObserver(PlaySpaceStateFookTypes.valueChanged,
            (playSpaceState) => { this.notifyObserver(GameStateFookTypes.valueChanged); });
        this.deckSpaceState.addObserver(DeckSpaceStateFookTypes.valueChanged,
            (deckSpaceState) => { this.notifyObserver(GameStateFookTypes.valueChanged); });
        this.subScenarioSpaceState.addObserver(SubScenarioSpaceStateFookTypes.valueChanged,
            (subScenarioSpaceState) => { this.notifyObserver(GameStateFookTypes.valueChanged); });
    }
    get playerOracle(){
        const player=this.playSpaceState.player;
        if(player===Player.null)
            return null;
        if(player===Player.user)
            return this.user;
        else return this.opponent;
    }
    addState(stateName: string, defaultValue: any) {
        this.#state[stateName] = defaultValue;
    }
    deleteState(stateName: string) {
        delete this.#state[stateName];
    }
    getState(stateName: string): any {
        return this.#state[stateName];
    }
    setState(stateName: string, setValue: any): void {
        this.#state[stateName] = setValue;
    }
    roundInit(){
        this.playSpaceState.roundInit();
        this.deckSpaceState.roundInit(this);
    }
}
export { GameState, PlaySpaceState, PlacedCardState}