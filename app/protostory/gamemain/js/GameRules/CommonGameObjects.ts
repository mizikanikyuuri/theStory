import { GameBoardCardProp, GameBoardDeckProp } from "Components/GameBoard/GameBoard";

enum Player {
    "user",
    "opponent",
    null,
}
enum DeckType {
  market="market",
  dungen="dungen",
  church="church",
  goal="goal"
}
enum GameStateFookTypes{
  "valueChanged",
  "gameEnded"
}
enum PlayerStateFookTypes{
  "valueChanged"
}
enum PlaySpaceStateFookTypes{
  "valueChanged"
}
enum PlacedCardStateFookTypes{
  "valueChanged"
}
enum DeckSpaceStateFookTypes{
  "valueChanged",
  "addDeck"
}
enum SubScenarioSpaceStateFookTypes{
  "valueChanged",
  "addScenario",
}
enum MonsterStateFookTypes{
  "valueChanged"
}
type DisplayingStatus={
    userName:string,
    opponentName:string,
    userStatus:{},
    opponentStatus:{},
    decks:Array<GameBoardDeckProp>,
    goalDecks:Array<GameBoardDeckProp>,
    userPlaySpaceCardList:Array<GameBoardCardProp>,
    opponentPlaySpaceCardList:Array<GameBoardCardProp>,
    userSubScenarioList:Array<GameBoardCardProp>,
    opponentSubScenarioList:Array<GameBoardCardProp>,
    winner:Player,
    boardDisable:boolean,
    userChat:Array<string>,
    opponentChat:Array<string>,
  }
const InitialPlayerStatus={
  // hitPoint: 100,
  // attack: 30,
  // defense: 20,
  // gold: 0,
  hitPoint: 10,
  attack: 3,
  defense: 0,
  gold: 0,
}

const InitialDecks=new Map([
  [DeckType.market,["prayer", "saintClause", "godPunishment", "stayChildGirl"]],
  [DeckType.dungen,["slime", "goblin", "orc"]],
  [DeckType.church,["arbeit", "buyHerb", "buySteelSword", "buyDragonKiller"]],
  // [DeckType.market,["prayer", "saintClause", "godPunishment", "stayChildGirl"]],
  // [DeckType.dungen,["slime", "goblin", "orc"]],
  // [DeckType.church,["arbeit", "buyHerb", "buySteelSword", "buySteelArmor", "dragonKiller"]],
]);
export {Player,DeckType
        ,GameStateFookTypes,PlayerStateFookTypes
        ,PlaySpaceStateFookTypes
        ,DeckSpaceStateFookTypes
        ,SubScenarioSpaceStateFookTypes
        ,MonsterStateFookTypes
        ,PlacedCardStateFookTypes
        ,DisplayingStatus,InitialPlayerStatus,InitialDecks}