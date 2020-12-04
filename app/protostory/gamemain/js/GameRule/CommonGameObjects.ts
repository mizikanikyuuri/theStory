enum Player {
    "user",
    "opponent",
    null
}
enum DeckType {
  "market",
  "dungen",
  "church"
}
enum GameStateFookTypes{
  "valueChanged"
}
enum PlayerStateFookTypes{
  "valueChanged"
}
enum PlaySpaceStateFookTypes{
  "valueChanged"
}
enum DeckSpaceStateFookTypes{
  "valueChanged",
  "addDeck"
}
enum DeckStateFookTypes{
  "valueChanged"
}
enum SubScenarioSpaceStateFookTypes{
  "valueChanged",
  "addScenario",
}
enum MonsterStateFookTypes{
  "valueChanged"
}
type DisplayingStatus={
    placedCard:Array<string>,
    userStatus:{},
    opponentStatus:{},
    decks:Array<Array<string>>,
    userSubScenarioList:Array<string>,
    opponentSubScenarioList:Array<string>,
  }
const InitialPlayerStatus={
  hitPoint: 100,
  attack: 30,
  defense: 10,
  gold: 20,
  // hitPoint: 10,
  // attack: 3,
  // defense: 0,
  // gold: 0,
}

const InitialDecks=new Map([
  [DeckType.market,["prayer", "saintClause", "godPunishment", "stayChildGirl"]],
  [DeckType.dungen,["slime", "goblin", "orc"]],
  [DeckType.church,["arbeit", "buyHerb", "buySteelSword", "buySteelArmor", "dragonKiller"]],
]);
export {Player,DeckType
        ,GameStateFookTypes,PlayerStateFookTypes
        ,PlaySpaceStateFookTypes
        ,DeckStateFookTypes,DeckSpaceStateFookTypes
        ,SubScenarioSpaceStateFookTypes
        ,MonsterStateFookTypes
        ,DisplayingStatus,InitialPlayerStatus,InitialDecks}