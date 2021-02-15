import _ from 'lodash'
import React, { Component } from "react";
import { GameBoard, GameBoardCardProp, GameBoardDeckProp, GameBoardProps } from "./components/GameBoard/GameBoard";
import { CommunicationInfo } from "Components/CommunicationInfo/CommunicationInfo"
import { DeckProps } from 'Components/GameBoard/DeckSpace/Deck/Deck';
import { GameState, PlacedCardState, PlaySpaceState } from "./GameRules/GameState/GameState";
import { AbstractScenario } from "./GameRules/Scenario";
import { Player,GameStateFookTypes,DisplayingStatus } from "./GameRules/CommonGameObjects";
import { whenUserHitPointIsZero,whenOpponentHitPointIsZero } from "./GameRules/GameBasicRules";
import { PopUpContainer } from './PopUpContainer';
import { HitPoint,HitPointParameterFookTypes } from 'Utilities/Parameters/HitPoint';
import { ScenarioContainer } from 'GameRules/GameState/ScenarioContainer';
import { GameCardProps } from 'Components/GameCard/GameCard';
import { DeckState } from 'GameRules/GameState/DeckSpaceState';
import { SubScenarioSpaceState } from 'GameRules/GameState/SubScenarioSpaceState';
import { ActionDeterminedResponse, GameMainConnectionResponseEvents, GameMainWebSocket, GameStartResponse } from 'Utilities/WebSocket/GameMainWebSocket';
import { _sleep} from 'Utilities/Sleep';
import './Game.css';

export default class Game extends React.Component<{},DisplayingStatus>{
  gameState: GameState
  gameMainWebSocket:GameMainWebSocket
  constructor(props) {
    super(props);
    this.gameState = new GameState();
    this.gameMainWebSocket = new GameMainWebSocket(props.webSocketUrl);
    this.gameMainWebSocket.addGameEventListener(GameMainConnectionResponseEvents.GameStart,this.#gameStart);
    this.gameMainWebSocket.addGameEventListener(GameMainConnectionResponseEvents.ActionDetermined,this.#endPhaseProcess);
    this.gameState.addObserver(this.#updateStatus,GameStateFookTypes.valueChanged);
    this.gameState.user.getParam(HitPoint).addObserver(whenUserHitPointIsZero(this.gameState),HitPointParameterFookTypes.isZero);
    this.gameState.opponent.getParam(HitPoint).addObserver(whenOpponentHitPointIsZero(this.gameState),HitPointParameterFookTypes.isZero);
    this.state = {
      userName:"waiting user connecting...",
      opponentName:"waiting user connecting...",
      userStatus: this.gameState.user.getDisPlayParameters(),
      opponentStatus: this.gameState.opponent.getDisPlayParameters(),
      userSubScenarioList:getSubScenarioSpaceComponentProps(this.gameState.subScenarioSpaceState,Player.user),
      opponentSubScenarioList:getSubScenarioSpaceComponentProps(this.gameState.subScenarioSpaceState,Player.opponent),
      userPlaySpaceCardList:getPlaySpaceComponentProps(this.gameState.playSpaceState,Player.user),
      opponentPlaySpaceCardList:getPlaySpaceComponentProps(this.gameState.playSpaceState,Player.opponent),
      decks: getDeckComponentProp(this.gameState.deckSpaceState.getAllDeckStates()),
      goalDecks: getDeckComponentProp(this.gameState.goalCardDeckSpaceState.getAllDeckStates()),
      winner:this.gameState.winner,
      boardDisable:true,
      userChat:[],
      opponentChat:[],
    }

  }
  #updateStatus = (gameState: GameState) => {
    this.setState(
        {
          userStatus: gameState.user.getDisPlayParameters(),
          opponentStatus: gameState.opponent.getDisPlayParameters(),
          userSubScenarioList:getSubScenarioSpaceComponentProps(gameState.subScenarioSpaceState,Player.user),
          opponentSubScenarioList:getSubScenarioSpaceComponentProps(gameState.subScenarioSpaceState,Player.opponent),
          userPlaySpaceCardList:getPlaySpaceComponentProps(gameState.playSpaceState,Player.user),
          opponentPlaySpaceCardList:getPlaySpaceComponentProps(gameState.playSpaceState,Player.opponent),
          decks: getDeckComponentProp(gameState.deckSpaceState.getAllDeckStates()),
          goalDecks: getDeckComponentProp(gameState.goalCardDeckSpaceState.getAllDeckStates()),
          winner:gameState.winner,
        }
    );
  }
  #sendChat=(message:string) =>{
    let newChat=this.state.userChat.concat([message]);
      this.setState({
        userChat:newChat
      });
  }
  #gameStart= async (data: GameStartResponse) =>{
    this.setState({
      userName:data.userName,
      opponentName:data.opponentName,
      boardDisable:false,
    });
  }
  #placeDeckCard = (e: any, cardList: GameCardProps[]) => {
      ScenarioContainer.getScenario(cardList[0].cardName).placeCard(this.gameState,Player.user);
  };
  #placeSubSpaceCard = (e: any, cardName: string, key: number) => {
      ScenarioContainer.getScenario(cardName).placeCard(this.gameState,Player.user);
  };
  #disPlaceCard = (e: any, cardName: string, key: number) => {
    this.gameState.playSpaceState.removeCard(Player.user, key);
  }
  #turnEndProcess =()=>{
    this.setState({boardDisable:true});
    console.log("sendingCardList");
    console.log(this.gameState.playSpaceState.getCardState(Player.user));
    const sendingData=this.gameState.playSpaceState.getCardState(Player.user).map(cardState=>cardState.getWebSocketFormattedParams());
    this.gameMainWebSocket.turnEnd(sendingData);
  }
  #endPhaseProcess = async (data: ActionDeterminedResponse) => {
    let currentCardState: PlacedCardState;
    let currentScenario: AbstractScenario;
    data.cardList.forEach(
      cardData=>
        ScenarioContainer.getScenario(cardData.scenarioName).placeCardWithState(this.gameState,Player.opponent,cardData)
    );
    const startPlayer=this.state.userName===data.startPlayer?"user":"opponent";
    this.gameState.playSpaceState.setStartPlayer(startPlayer);
    while (this.gameState.playSpaceState.prePlayingCard !== null) {
      currentCardState = this.gameState.playSpaceState.prePlayingCard;
      currentScenario = ScenarioContainer.getScenario(currentCardState.scenarioName);
      currentScenario.prePlay(this.gameState);
      this.gameState.playSpaceState.nextPrePlayCard();
    }

    while (this.gameState.playSpaceState.playingCard !== null) {
      await _sleep(500);
      currentCardState = this.gameState.playSpaceState.playingCard;
      currentScenario = ScenarioContainer.getScenario(currentCardState.scenarioName);
      let CostPaid=currentScenario.payCost(this.gameState);
      if (CostPaid===true&&currentCardState.validity === "valid")
        currentScenario.doEffect(this.gameState);
      this.gameState.playSpaceState.nextPlayCard();
    }
    this.gameState.roundInit();
    this.setState({boardDisable:false});
  }
  render() {
    return (
      <div>
      <GameBoard
        deckClickAction={this.#placeDeckCard}
        subCardSpaceClickAction={this.#placeSubSpaceCard}
        playSpaceCardClickAction={this.#disPlaceCard}
        turnEndButtonClickAction={this.#turnEndProcess}
        
        userName={this.state.userName}
        opponentName={this.state.opponentName}
        userStatus={this.state.userStatus}
        opponentStatus={this.state.opponentStatus}
        opponentSubCardList={this.state.opponentSubScenarioList}
        userSubCardList={this.state.userSubScenarioList}
        userPlaySpaceCardList={this.state.userPlaySpaceCardList}
        opponentPlaySpaceCardList={this.state.opponentPlaySpaceCardList}
        decks={this.state.decks}
        goalDecks={this.state.goalDecks}
        disable={this.state.boardDisable}
      >
        <PopUpContainer gameState={this.gameState}/>
      </GameBoard>
      <CommunicationInfo className={"the-story-opponent-communication-space"} playerName={this.state.opponentName} chat={this.state.opponentChat} />
      <CommunicationInfo className={"the-story-user-communication-space"} playerName={this.state.userName} addChatFunc={this.#sendChat} chat={this.state.userChat}/>
      </div>
    );
  }
}

function getDeckComponentProp(deckStates:DeckState[]):Array<GameBoardDeckProp>{
  const deckComponentProps=deckStates.map(
    (deckState)=>{
      return {
        deckName:deckState.deckType,
        cardList:deckState.getAllCards().map(
          (cardState)=>{return {
            cardName:cardState.scenarioName,
            hoverInfo:Object.entries(cardState.getDisPlayParameters()).map((status,key)=>{
              return status[0]+":"+status[1];
            }).join("\n")
          }}
        ),

      }
    }
    );
  return deckComponentProps;
}
function getSubScenarioSpaceComponentProps(subScenarioSpaceState:SubScenarioSpaceState,player:Player.user|Player.opponent):Array<GameBoardCardProp>{
  const subScenarioCardSpaceProps=subScenarioSpaceState.getSubScenarios(player).map(
    (scenarioCard)=>{
      return {
        cardName: scenarioCard.scenarioName,
        hoverInfo: Object.entries(scenarioCard.getDisPlayParameters()).map((status,key)=>{
          return status[0]+":"+status[1];
        }).join("\n")
      }
    }
  );
  return subScenarioCardSpaceProps;
}
function getPlaySpaceComponentProps(playSpaceState:PlaySpaceState,player:Player.user|Player.opponent):Array<GameBoardCardProp>{
  const playSpaceCardProps=playSpaceState.getCardState(player).map(
    (placedCard)=>{
      return {
        cardName: placedCard.scenarioName,
        highlight: playSpaceState.playingCard===placedCard,
        hoverInfo: Object.entries(placedCard.getDisPlayParameters()).map((status,key)=>{
          return status[0]+":"+status[1];
        }).join("\n")
      }
    }
  );
  return playSpaceCardProps;
}

