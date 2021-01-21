import _ from 'lodash'
import { MultiFookObservable } from "Utilities/ObservedState"
import { Player, PlaySpaceStateFookTypes } from "../CommonGameObjects"
import { PlacedCardState } from "./PlacedCardState"
class PlaySpaceState extends MultiFookObservable<PlaySpaceStateFookTypes>{
    #playingCard: [Player, number]
    #prePlayingCard: [Player, number]
    #userCardList: Array<PlacedCardState>
    #opponentCardList: Array<PlacedCardState>
    constructor() {
        super();
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
    get player(): Player {
        return this.#playingCard[0];
    }
    get prePlayingCard(): PlacedCardState | null {
        if (this.#prePlayingCard[0] === Player.user && this.#prePlayingCard[1] < this.#userCardList.length)
            return this.#userCardList[this.#prePlayingCard[1]];
        if (this.#prePlayingCard[0] === Player.opponent && this.#prePlayingCard[1] < this.#opponentCardList.length)
            return this.#opponentCardList[this.#prePlayingCard[1]];
        return null;
    }
    get prePlayer(): Player {
        return this.#prePlayingCard[0];
    }
    get cardState():Array<PlacedCardState>{
        return this.#userCardList.concat(this.#opponentCardList);
    }
    getCardState(player:Player):Array<PlacedCardState>{
        if(player===Player.user)
            return this.#userCardList.filter((card)=>true)
        if(player===Player.opponent)
            return this.#opponentCardList.filter((card)=>true)
        return this.cardState;
    }
    nextPlayCard(): void {
        if (this.#playingCard[0] === Player.null)
            throw SyntaxError("PlaySpaceState.nextPlayCard can not be called before setStartPlayer called")
        this.playingCard.played = true;
        if (this.#playingCard[0] === Player.user) {
            if(typeof this.#opponentCardList[this.#playingCard[1]] !== 'undefined')
                this.#playingCard[0]=switchPlayer(this.#playingCard[0]);
            if(this.playingCard.played ===true)
                this.#playingCard[1]++;
            if(this.playingCard===null)
                this.#playingCard[0]=switchPlayer(this.#playingCard[0]);
        } else {
            if(typeof this.#userCardList[this.#playingCard[1]] !== 'undefined')
                this.#playingCard[0]=switchPlayer(this.#playingCard[0]);
            if(this.playingCard.played ===true)
                this.#playingCard[1]++;
            if(this.playingCard===null)
                this.#playingCard[0]=switchPlayer(this.#playingCard[0]);
        }
        this.notifyObserver([PlaySpaceStateFookTypes.valueChanged]);
    }
    nextPrePlayCard(): void {
        if (this.#prePlayingCard[0] === Player.null)
            throw SyntaxError("PlaySpaceState.nextPlayCard can not be called before setStartPlayer called")
        this.prePlayingCard.prePlayed = true;
        if (this.#prePlayingCard[0] === Player.user) {
            if(typeof this.#opponentCardList[this.#prePlayingCard[1]] !== 'undefined')
                this.#prePlayingCard[0]=switchPlayer(this.#prePlayingCard[0]);
            if(this.prePlayingCard.prePlayed ===true)
                this.#prePlayingCard[1]++;
            if(this.prePlayingCard===null)
                this.#prePlayingCard[0]=switchPlayer(this.#prePlayingCard[0]);
        } else {
            if(typeof this.#userCardList[this.#prePlayingCard[1]] !== 'undefined')
                this.#prePlayingCard[0]=switchPlayer(this.#prePlayingCard[0]);
            if(this.prePlayingCard.prePlayed ===true)
                this.#prePlayingCard[1]++;
            if(this.prePlayingCard===null)
                this.#prePlayingCard[0]=switchPlayer(this.#prePlayingCard[0]);
        }
        this.notifyObserver([PlaySpaceStateFookTypes.valueChanged]);
    }
    getScenarioNames(user: Player = Player.null): Array<string> {
        const mapFunc = (cardState: PlacedCardState) => cardState.scenarioName;
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
        const mapFunc = (cardState: PlacedCardState) => cardState.scenarioName;
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
        const mapFunc = (cardState: PlacedCardState) => cardState.scenarioName;
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
    addCard(player:Player.user|Player.opponent, scenarioName: string): void {
        const newCardState= new PlacedCardState(scenarioName);
        newCardState.addObserver((target)=>this.notifyObserver([PlaySpaceStateFookTypes.valueChanged]));
        if (player === Player.user) {
            this.#userCardList.push(newCardState);
        } else {
            this.#opponentCardList.push(newCardState);
        }
        this.notifyObserver([PlaySpaceStateFookTypes.valueChanged]);
    }
    addCardState(player:Player.user|Player.opponent, placedCardState: PlacedCardState): void {
        placedCardState.addObserver((target)=>this.notifyObserver([PlaySpaceStateFookTypes.valueChanged]));
        if (player === Player.user) {
            this.#userCardList.push(placedCardState);
        } else {
            this.#opponentCardList.push(placedCardState);
        }
        this.notifyObserver([PlaySpaceStateFookTypes.valueChanged]);
    }
    removeCard(player:Player.user|Player.opponent,  order: number): void {
        if (player === Player.user)
            this.#userCardList.splice(order, 1);
        else
            this.#opponentCardList.splice(order, 1);
        this.notifyObserver([PlaySpaceStateFookTypes.valueChanged]);
    }
    setStartPlayer(player: "user" | "opponent"): void {
        const startPlayer = player === "user" ? Player.user : Player.opponent;
        this.#playingCard = [startPlayer, 0];
        this.#prePlayingCard = [startPlayer, 0];
        //if starting player have no placed card switch starting player
        if(this.prePlayingCard===null){
            this.#playingCard = [startPlayer=== Player.user ? Player.opponent : Player.user, 0];
            this.#prePlayingCard = [startPlayer=== Player.user ? Player.opponent : Player.user, 0];
        }

        this.notifyObserver([PlaySpaceStateFookTypes.valueChanged]);
    }
}
function switchPlayer(player:Player.user|Player.opponent):Player.user|Player.opponent{
    return player===Player.user?Player.opponent:Player.user;
}
export { PlacedCardState, PlaySpaceState }