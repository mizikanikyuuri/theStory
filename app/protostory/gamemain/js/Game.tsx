import _ from 'lodash'
import React, { Component } from "react";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { GameState, PlacedCardState } from "./GameRule/GameState/GameState"
import { ScenarioFactory, ScenarioInterface } from "./GameRule/Scenario"
import { Player,DisplayingStatus,InitialPlayerStatus } from "./GameRule/CommonGameObjects"

export default class Game extends React.Component<{}, DisplayingStatus>{
  gameState: GameState
  constructor(props) {
    super(props);
    this.gameState = new GameState(this.#updateStatus);
    this.state = {
      placedCard: [],
      userStatus: _.cloneDeep(InitialPlayerStatus),
      opponentStatus: _.cloneDeep(InitialPlayerStatus),
      userSubScenarioList:[],
      opponentSubScenarioList:[],
      decks:[],
    }
  }
  #updateStatus = (gameState: GameState) => {
    this.setState(
        {
            placedCard: gameState.playSpaceState.getScenarioNames(Player.user),
            userStatus: gameState.user.getDisPlayParameters(),
            opponentStatus: gameState.opponent.getDisPlayParameters(),
            decks: gameState.deckSpaceState.getAllDeckStates().map(deck=>deck.getAllCards().map(card=>card.scenarioName)),
            userSubScenarioList:gameState.subScenarioSpaceState.getSubScenarios(Player.user),
            opponentSubScenarioList:[],
        }
    );
  }
  #placeCard = (cardName:string) => {
    this.gameState.playSpaceState.addCard("user", cardName);
  };
  #disPlaceCard = (cardNum:number) => {
    this.gameState.playSpaceState.removeCard("user", cardNum);
  }
  #turnEndProcess = () => {
    let currentCardState: PlacedCardState;
    let currentScenario: ScenarioInterface;
    this.gameState.playSpaceState.setStartPlayer("user");
    while (this.gameState.playSpaceState.prePlayingCard !== null) {
      currentCardState = this.gameState.playSpaceState.prePlayingCard;
      currentScenario = ScenarioFactory.getScenario(currentCardState.ScenarioName);
      currentScenario.prePlay(this.gameState);
      this.gameState.playSpaceState.nextPrePlayCard();
    }

    while (this.gameState.playSpaceState.playingCard !== null) {
      currentCardState = this.gameState.playSpaceState.playingCard;
      currentScenario = ScenarioFactory.getScenario(currentCardState.ScenarioName);
      currentScenario.payCost(this.gameState);
      if (currentCardState.validity === "valid")
        currentScenario.doEffect(this.gameState);
      this.gameState.playSpaceState.nextPlayCard();
    }
    this.gameState.roundInit();
  }
  render() {
    return (
      <GameBoard
        placedCard={this.state.placedCard}
        placeCard={this.#placeCard}
        pressTurnEndButton={this.#turnEndProcess}
        disPlaceCard={this.#disPlaceCard}
        userStatus={this.state.userStatus}
        opponentStatus={this.state.opponentStatus}
        userSubCardList={this.state.userSubScenarioList}
        opponentSubCardList={this.state.opponentSubScenarioList}
        decks={this.state.decks}
      />
    );
  }
}
