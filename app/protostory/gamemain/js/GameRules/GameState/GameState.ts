import _ from 'lodash'
import { Player,DeckType, GameStateFookTypes, DeckSpaceStateFookTypes, PlaySpaceStateFookTypes, SubScenarioSpaceStateFookTypes, InitialDecks } from "../CommonGameObjects"
import { PlaySpaceState, PlacedCardState } from "./PlaySpaceState"
import { DeckSpaceState } from "./DeckSpaceState"
import { SubScenarioSpaceState } from "./SubScenarioSpaceState"
import { MultiFookObservable } from "Utilities/ObservedState"
import { OracleStates } from './OracleStates'
import {  InputQueueSet  } from "./InputQueue";
class GameState extends MultiFookObservable<GameStateFookTypes>{
    #state = {
    };
    #winner: Player = Player.null;
    readonly playSpaceState: PlaySpaceState = new PlaySpaceState();
    readonly deckSpaceState: DeckSpaceState = new DeckSpaceState(this);
    readonly goalCardDeckSpaceState: DeckSpaceState = new DeckSpaceState(this);
    readonly subScenarioSpaceState: SubScenarioSpaceState = new SubScenarioSpaceState();
    readonly user = new OracleStates();
    readonly opponent = new OracleStates();
    readonly inputWaitingQueue:InputQueueSet=new InputQueueSet();
    constructor() {
        super();
        this.playSpaceState.addObserver((playSpaceState)=>this.notifyObserver([GameStateFookTypes.valueChanged]));
        this.deckSpaceState.addObserver((deckSpaceState)=>this.notifyObserver([GameStateFookTypes.valueChanged]));
        InitialDecks.forEach(
            (initialDeck,deckType)=>{
                this.deckSpaceState.addDeck(deckType,initialDeck,this);
            });
        this.goalCardDeckSpaceState.addObserver((goalCardDeckSpaceState)=>this.notifyObserver([GameStateFookTypes.valueChanged]));
        this.goalCardDeckSpaceState.addDeck(DeckType.goal,["redDragon"],this);
        this.subScenarioSpaceState.addObserver((subScenarioSpaceState)=>this.notifyObserver([GameStateFookTypes.valueChanged]));
        this.inputWaitingQueue.addObserver((inputWaitingQueue)=>this.notifyObserver([GameStateFookTypes.valueChanged]));
     }
    get winner(){
        return this.#winner;
    }
    set winner(winner:Player){
        if(winner===Player.null)
            throw Error("Winner can not be null");
        if(this.#winner!==Player.null)
            throw Error("Winner can not be changed");
        this.#winner=winner;
    }
    get playerOracle() {
        const player = this.playSpaceState.player;
        if (player === Player.null)
            return null;
        if (player === Player.user)
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
    roundInit() {
        this.playSpaceState.roundInit();
        this.deckSpaceState.roundInit(this);
        this.goalCardDeckSpaceState.roundInit(this);
        this.subScenarioSpaceState.roundInit(this);
    }
}
export { GameState, PlaySpaceState, PlacedCardState }