import _ from 'lodash'
import {ObservedState,ObservedStateTrait} from "Utilities/ObservedState"
import { Player,PlaySpaceStateFookTypes } from "../CommonGameObjects"
type PlacedCardState = {
    ScenarioName: string,
    validity: "valid" | "invalid",
    played: boolean,
    prePlayed: boolean,
}
class PlaySpaceState implements ObservedState<PlaySpaceState,PlaySpaceStateFookTypes>{
    #playingCard: [Player, number]
    #prePlayingCard: [Player, number]
    #userCardList: Array<PlacedCardState>
    #opponentCardList: Array<PlacedCardState>
    #observedStateTrait:ObservedState<PlaySpaceState,PlaySpaceStateFookTypes>
    addObserver=(fook: PlaySpaceStateFookTypes, callBackFunc: (target: PlaySpaceState) => void)=>{
        this.#observedStateTrait.addObserver(fook,callBackFunc);
    }
    deleteObserver=(fook: PlaySpaceStateFookTypes, callBackFunc: (target: PlaySpaceState) => void)=>{
        this.#observedStateTrait.deleteObserver(fook,callBackFunc);
    }
    notifyObserver=(fook: PlaySpaceStateFookTypes)=>{
        this.#observedStateTrait.notifyObserver(fook);
    }
    constructor() {
        this.#observedStateTrait=new ObservedStateTrait(this);
        this.roundInit();
    }
    roundInit() {
        this.#userCardList = [];
        this.#opponentCardList = [];
        this.#playingCard = [null, 0];
        this.#prePlayingCard = [null, 0];
    }
    get playingCard(): PlacedCardState | null {
        if (this.#playingCard[0] === Player.user && this.#playingCard[1] < this.#userCardList.length)
            return this.#userCardList[this.#playingCard[1]];
        if (this.#playingCard[0] === Player.opponent && this.#playingCard[1] < this.#opponentCardList.length)
            return this.#opponentCardList[this.#playingCard[1]];
        return null;
    }
    get player():Player{
        return this.#playingCard[0];
    }
    get prePlayingCard(): PlacedCardState | null {
        if (this.#prePlayingCard[0] === Player.user && this.#prePlayingCard[1] < this.#userCardList.length)
            return this.#userCardList[this.#prePlayingCard[1]];
        if (this.#prePlayingCard[0] === Player.opponent && this.#prePlayingCard[1] < this.#opponentCardList.length)
            return this.#opponentCardList[this.#prePlayingCard[1]];
        return null;
    }
    get prePlayer():Player{
        return this.#prePlayingCard[0];
    }
    nextPlayCard(): void {
        if(this.#playingCard[0]===null)
            throw SyntaxError("PlaySpaceState.nextPlayCard can not be called before setStartPlayer called")
        this.playingCard.played = true;
        if(this.#playingCard[0]===Player.user){
            if(typeof this.#opponentCardList[this.#playingCard[1]] ==='undefined'
                || this.#opponentCardList[this.#playingCard[1]].played===true)
                this.#playingCard[1]++;
            else
                this.#playingCard[0]= Player.opponent;
        }else{
            if(typeof this.#userCardList[this.#playingCard[1]] ==='undefined'
                || this.#userCardList[this.#playingCard[1]].played===true)
                this.#playingCard[1]++;
            else
                this.#playingCard[0]=Player.user;
        }
        this.notifyObserver(PlaySpaceStateFookTypes.valueChanged);
    }
    nextPrePlayCard(): void {
        if(this.#prePlayingCard[0]===null)
            throw SyntaxError("PlaySpaceState.nextPlayCard can not be called before setStartPlayer called")
        this.prePlayingCard.prePlayed = true;
        if(this.#prePlayingCard[0]===Player.user){
            if(typeof this.#opponentCardList[this.#prePlayingCard[1]] ==='undefined'
                || this.#opponentCardList[this.#prePlayingCard[1]].prePlayed===true)
                this.#prePlayingCard[1]++;
            else
                this.#prePlayingCard[0]= Player.opponent;
        }else{
            if(typeof this.#userCardList[this.#prePlayingCard[1]] ==='undefined'
                || this.#userCardList[this.#prePlayingCard[1]].prePlayed===true)
                this.#prePlayingCard[1]++;
            else
                this.#prePlayingCard[0]=Player.user;
        }
        this.notifyObserver(PlaySpaceStateFookTypes.valueChanged);
    }
    getScenarioNames(user: Player = Player.null): Array<string> {
        const mapFunc = (cardState: PlacedCardState) => cardState.ScenarioName;
        if (user === Player.user) {
            return this.#userCardList.map(mapFunc);
        } else if (user === Player.opponent) {
            return this.#opponentCardList.map(mapFunc);
        } else {
            return _.union(this.#userCardList.map(mapFunc),
                this.#opponentCardList.map(mapFunc)
            );
        }
    }
    getPlayedScenarioNames(user: Player = Player.null): Array<string> {
        const filterFunc = (cardState: PlacedCardState) => cardState.played;
        const mapFunc = (cardState: PlacedCardState) => cardState.ScenarioName;
        if (user === Player.user) {
            return this.#userCardList.filter(filterFunc).map(mapFunc);
        } else if (user === Player.opponent) {
            return this.#opponentCardList.filter(filterFunc).map(mapFunc);
        } else {
            return _.union(this.#userCardList.filter(filterFunc).map(mapFunc),
                this.#opponentCardList.filter(filterFunc).map(mapFunc)
            );
        }
    }
    getPrePlayedScenarioNames(user: Player = Player.null): Array<string> {
        const filterFunc = (cardState: PlacedCardState) => cardState.prePlayed;
        const mapFunc = (cardState: PlacedCardState) => cardState.ScenarioName;
        if (user === Player.user) {
            return this.#userCardList.filter(filterFunc).map(mapFunc);
        } else if (user === Player.opponent) {
            return this.#opponentCardList.filter(filterFunc).map(mapFunc);
        } else {
            return _.union(this.#userCardList.filter(filterFunc).map(mapFunc),
                this.#opponentCardList.filter(filterFunc).map(mapFunc)
            );
        }
    }
    addCard(user: "user" | "opponent", scenarioName: string): void {
        if (user === "user") {
            this.#userCardList.push({
                ScenarioName: scenarioName,
                validity: "valid",
                played: false,
                prePlayed: false
            });
        } else {
            this.#opponentCardList.push({
                ScenarioName: scenarioName,
                validity: "valid",
                played: false,
                prePlayed: false
            });
        }
        this.notifyObserver(PlaySpaceStateFookTypes.valueChanged);
    }
    removeCard(user: "user" | "opponent", order: number): void {
        if (user === "user")
            this.#userCardList.splice(order, 1);
        else
            this.#opponentCardList.splice(order, 1);
            this.notifyObserver(PlaySpaceStateFookTypes.valueChanged);
    }
    setStartPlayer(player: "user" | "opponent"): void {
        const startPlayer = player === "user" ? Player.user : Player.opponent;
        this.#playingCard = [startPlayer, 0];
        this.#prePlayingCard = [startPlayer, 0];
        this.notifyObserver(PlaySpaceStateFookTypes.valueChanged);
    }
}
export {PlacedCardState,PlaySpaceState}