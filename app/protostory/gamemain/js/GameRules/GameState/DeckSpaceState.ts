import _ from 'lodash'
import { DeckType,DeckSpaceStateFookTypes } from "../CommonGameObjects"
import {GameState} from "./GameState"
import {Observable,MultiFookObservable} from "Utilities/ObservedState"
import { ScenarioContainer} from "GameRules/GameState/ScenarioContainer"
import { ScenarioCardState } from './ScenarioCardState'

enum DeckCardMoveType{
    "Bottom",
    "Top",
    "Index"
}
class DeckState extends Observable{
    readonly deckType:DeckType
    #deckCards:Array<ScenarioCardState>

    constructor(deckType:DeckType){
        super();
        this.deckType=deckType;
        this.#deckCards=[];
    }
    getCard(index:number):ScenarioCardState{
        if(  index >= this.#deckCards.length)
            throw SyntaxError("DeckState.getCard argument index is too big");
        return this.#deckCards[index];
    }
    getCardByName(scenarioName:string):Array<ScenarioCardState>{
        return this.#deckCards.filter(card=>card.scenarioName===scenarioName);
    }
    getAllCards():Array<ScenarioCardState>{
        return this.#deckCards.filter(card=>true);
    }
    addCard(scenarioName:string,gameState:GameState):void{
        const deckCardState=new ScenarioCardState(scenarioName);
        this.#deckCards.push(deckCardState);
        const addedScenario=ScenarioContainer.getMainScenario(scenarioName);
        addedScenario.setToDeck(gameState);
        this.notifyObserver();
    }
    removeCard(deckCardState:ScenarioCardState):void{
        const stateId = this.#deckCards.indexOf(deckCardState);
        if(stateId===-1)
            throw SyntaxError("DeckState.removeCard could not found element "+deckCardState);
        this.#deckCards.splice(stateId,1);
        this.notifyObserver();
    }
    get cardNames(){
        return this.#deckCards.map(card=>card.scenarioName);
    }
    roundInit(gameState:GameState){
        const cleanUpScenario=ScenarioContainer.getMainScenario(this.#deckCards[0].scenarioName);
        cleanUpScenario.cleanUp(gameState);
    }
    moveCard(deckCardState:ScenarioCardState,moveTo:DeckCardMoveType,index:number=null){
        const stateId = this.#deckCards.indexOf(deckCardState);
        if(stateId===-1)
            throw SyntaxError("DeckState.moveCard could not found element "+deckCardState);
        
        this.#deckCards.splice(stateId,1);
        switch(moveTo){
            case DeckCardMoveType.Bottom:
                this.#deckCards.push(deckCardState);
                break;
            case DeckCardMoveType.Top:
                this.#deckCards.splice(0,0,deckCardState);
                break;
            case DeckCardMoveType.Index:
                if(typeof this.#deckCards[index]==='undefined')
                    throw Error("DeckState.moveCard can not move to index place. index number is invalid");
                this.#deckCards.splice(index,0,deckCardState);
                break;
        }
        this.notifyObserver();
    }
    has(scenarioName:string):boolean{
        if (this.#deckCards.filter(card=>card.scenarioName===scenarioName).length>0)
            return true;
        else
         return false;
    }
}
class DeckSpaceState extends MultiFookObservable<DeckSpaceStateFookTypes>{
    #decks: Array<DeckState>
    #initializingDeck:DeckState

    constructor(gamestate:GameState) {
        super();
        this.#decks=[];
        this.#initializingDeck=null;
        this.#decks.forEach(deck=>deck.addObserver(
            (playSpaceState) => { this.notifyObserver([DeckSpaceStateFookTypes.valueChanged]); }));

    }
    getDeckState(deckType:DeckType){
        return this.#decks.find((deckState)=>deckState.deckType===deckType);
    }
    getAllDeckStates():Array<DeckState>{
        return this.#decks.filter(deck=>true);
    }
    addDeck(deckType:DeckType,scenarioNameList:Array<string>,gameState:GameState){
        const newDeck=new DeckState(deckType);
        this.#decks.push(newDeck);
        newDeck.addObserver((playSpaceState) => { this.notifyObserver([DeckSpaceStateFookTypes.valueChanged]); });
        scenarioNameList.forEach(scenarioName=>newDeck.addCard(scenarioName,gameState));
        this.notifyObserver([DeckSpaceStateFookTypes.valueChanged]);
    }
    get initializingDeck():DeckState|null{
        return this.#initializingDeck
    }
    roundInit(gameState:GameState){
        this.#decks.forEach(
            (deck)=>{
                this.#initializingDeck=deck;
                deck.roundInit(gameState);
            });
        this.#initializingDeck=null;
    }
}
export {DeckCardMoveType,DeckState,DeckSpaceState}