import { GameState } from "./GameState/GameState"
import { DeckCardMoveType } from "./GameState/DeckSpaceState"
import { OracleStates } from "./GameState/OracleStates";
import { MonsterStates } from "./GameState/MonsterStates";
const ScenarioCommonFunctions = {
    checkPlayedScenario: (senarioName: string, gameState: GameState): boolean => {
        if (gameState.playSpaceState.getPlayedScenarioNames().includes(senarioName)) {
            return true;
        }
        return false;
    },
    checkPrePlayedScenario: (senarioName: string, gameState: GameState): boolean => {
        if (gameState.playSpaceState.getPrePlayedScenarioNames().includes(senarioName)) {
            return true;
        }
        return false;
    },
    commonCleanUp: (gameState: GameState) => {
        const cleanUpCard = gameState.deckSpaceState.initializingDeck.getCard(0);
        gameState.deckSpaceState.initializingDeck.moveCard(cleanUpCard, DeckCardMoveType.Bottom);
    },
    battle: (oracleState: OracleStates, monsterState: MonsterStates) => {
        if (monsterState.getParam("hitPoint").current <= 0)
            return false;
        let monsterDealtDmg = monsterState.getParam("attackPower").current - oracleState.getParam("defensePower").current;
        let playerDealtDmg = oracleState.getParam("attackPower").current - monsterState.getParam("defensePower").current;
        monsterDealtDmg = monsterDealtDmg < 0 ? 0 : monsterDealtDmg;
        playerDealtDmg = playerDealtDmg < 0 ? 0 : playerDealtDmg;
        if (monsterDealtDmg === 0 && playerDealtDmg === 0)
            return 0;
        monsterState.getParam("hitPoint").change(-playerDealtDmg);
        oracleState.getParam("hitPoint").change(-monsterDealtDmg);
        if (monsterState.getParam("hitPoint").current <= 0)
            return true;
        return false;
    }
};
export { ScenarioCommonFunctions }