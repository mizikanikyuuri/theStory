import _ from 'lodash'
import { DeckType,DeckStateFookTypes,DeckSpaceStateFookTypes ,InitialDecks } from "../CommonGameObjects"
import {GameState} from "../GameState/GameState"
import {ObservedState,ObservedStateTrait} from "Utilities/ObservedState"
import { ScenarioFactory} from "../Scenario"

type DeckCardState={
    scenarioName:string
}
enum DeckCardMoveType{
    "Bottom",
    "Top",
    "Index"
}
class DeckState implements ObservedState<DeckState,DeckStateFookTypes>{
    readonly deckType:DeckType
    #deckCards:Array<DeckCardState>
    #observedStateTrait:ObservedStateTrait<DeckState,DeckStateFookTypes>
    addObserver=(fook: DeckStateFookTypes, callBackFunc: (target: DeckState) => void)=>{
        this.#observedStateTrait.addObserver(fook,callBackFunc);
    }
    deleteObserver=(fook: DeckStateFookTypes, callBackFunc: (target: DeckState) => void)=>{
        this.#observedStateTrait.deleteObserver(fook,callBackFunc);
    }
    notifyObserver=(fook: DeckStateFookTypes)=>{
        this.#observedStateTrait.notifyObserver(fook);
    }

    constructor(deckType:DeckType){
        this.#observedStateTrait=new ObservedStateTrait(this);
        this.deckType=deckType;
        this.#deckCards=[];
    }
    getCard(index:number):DeckCardState{
        if(  index >= this.#deckCards.length)
            throw SyntaxError("DeckState.getCard argument index is too big");
        return this.#deckCards[index];
    }
    getAllCards():Array<DeckCardState>{
        return this.#deckCards.filter(card=>true);
    }
    addCard(scenarioName:string,gameState:GameState):void{
        const deckCardState={
            scenarioName:scenarioName
        }
        this.#deckCards.push(deckCardState);
        //const addedScenario=ScenarioFactory.getMainScenario(scenarioName);
        // addedScenario.setToDeck(gameState);
        this.notifyObserver(DeckStateFookTypes.valueChanged);
    }
    removeCard(deckCardState:DeckCardState):void{
        const stateId = this.#deckCards.indexOf(deckCardState);
        if(stateId===-1)
            throw SyntaxError("DeckState.removeCard could not found element "+deckCardState);
        this.#deckCards.splice(stateId,1);
        this.notifyObserver(DeckStateFookTypes.valueChanged);
    }
    get cardNames(){
        return this.#deckCards.map(card=>card.scenarioName);
    }
    roundInit(gameState:GameState){
        const cleanUpScenario=ScenarioFactory.getMainScenario(this.#deckCards[0].scenarioName);
        cleanUpScenario.cleanUp(gameState);
    }
    moveCard(deckCardState:DeckCardState,moveTo:DeckCardMoveType,index:number=null){
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
        this.notifyObserver(DeckStateFookTypes.valueChanged);
    }
}
class DeckSpaceState implements ObservedState<DeckSpaceState,DeckSpaceStateFookTypes>{
    #decks: Array<DeckState>
    #initializingDeck:DeckState
    #observedStateTrait:ObservedStateTrait<DeckSpaceState,DeckSpaceStateFookTypes>
    addObserver=(fook: DeckSpaceStateFookTypes, callBackFunc: (target: DeckSpaceState) => void)=>{
        this.#observedStateTrait.addObserver(fook,callBackFunc);
    }
    deleteObserver=(fook: DeckSpaceStateFookTypes, callBackFunc: (target: DeckSpaceState) => void)=>{
        this.#observedStateTrait.deleteObserver(fook,callBackFunc);
    }
    notifyObserver=(fook: DeckSpaceStateFookTypes)=>{
        this.#observedStateTrait.notifyObserver(fook);
    }

    constructor(gamestate:GameState) {
        this.#observedStateTrait=new ObservedStateTrait(this);
        this.#decks=[];
        this.#initializingDeck=null;
        this.#decks.forEach(deck=>deck.addObserver(DeckStateFookTypes.valueChanged,
            (playSpaceState) => { this.notifyObserver(DeckSpaceStateFookTypes.valueChanged); }));
            InitialDecks.forEach(
                (initialDeck,deckType)=>{
                    this.addDeck(deckType,initialDeck,gamestate);
                });
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
        newDeck.addObserver(DeckStateFookTypes.valueChanged,
            (playSpaceState) => { this.notifyObserver(DeckSpaceStateFookTypes.valueChanged); });
        scenarioNameList.forEach(scenarioName=>newDeck.addCard(scenarioName,gameState));
        this.notifyObserver(DeckSpaceStateFookTypes.valueChanged);
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
export {DeckCardState,DeckCardMoveType,DeckState,DeckSpaceState}