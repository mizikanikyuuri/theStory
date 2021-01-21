import { GameState } from "../GameState/GameState";
import { PlacedCardState } from "../GameState/PlacedCardState";
import { ScenarioFooks,MainAbstractScenario} from "../Scenario"
import {ScenarioCommonFunctions} from "../ScenarioUtilities"
import { EffectTargetScenario } from "Utilities/Parameters/EffectTargetScenario";
import { ScenarioContainer} from "GameRules/GameState/ScenarioContainer"
import { Player } from "GameRules/CommonGameObjects";
const defaultPlaceCardProps={
    effectTargetScenario:null,
}
class GodPunishmentScenario extends MainAbstractScenario{
    readonly scenarioName: string;
    constructor(){
        super();
        this.scenarioName="godPunishment";
    }
    protected _setToDeck(gameState: GameState): void {
        return;
    }
    protected _placeCard(gameState: GameState,player:Player.user|Player.opponent){
        const selectCardCallBack=(selectedCard)=>{
            if(selectedCard===null)
                return;
                this._placeCardWithState(gameState,player,{effectTargetScenario:selectedCard});
        };
        const cardList=ScenarioCommonFunctions.getAllDeckScenario(gameState);
        ScenarioCommonFunctions.selectCard(gameState,cardList,selectCardCallBack);
    }
    protected _placeCardWithState(gameState: GameState,player:Player.user|Player.opponent,props:{}): void{
        const formattedProps={...defaultPlaceCardProps,...props};
        console.log("formattedProps",formattedProps);
        const cardState= new PlacedCardState(this.scenarioName);
        const effectTargetScenario= new EffectTargetScenario([formattedProps.effectTargetScenario]);
        cardState.addNewParameter(effectTargetScenario);
        gameState.playSpaceState.addCardState(player, cardState);
    }
    protected _prePlay(gameState: GameState): void {
        if(ScenarioCommonFunctions.checkPrePlayedScenario(this.scenarioName,gameState)){
            gameState.playSpaceState.prePlayingCard.validity="invalid";
        }
    }
    protected _payCost(gameState: GameState): boolean {
        return true;
    }
    protected _doEffect(gameState: GameState): void {
        const cardTargetScenario= gameState.playSpaceState.playingCard.getParam(EffectTargetScenario);
        if(cardTargetScenario===null)
            return;
        const targetScenario=ScenarioContainer.getScenario(cardTargetScenario.targetList[0]);
        gameState.playSpaceState.cardState.forEach(
            (cardState)=>{
                if (cardState.scenarioName===targetScenario.scenarioName)
                    cardState.validity="invalid";
            });
    }
    protected _cleanUp(gameState:GameState):void{
        ScenarioCommonFunctions.commonCleanUp(gameState);
    }
}
export default new GodPunishmentScenario();