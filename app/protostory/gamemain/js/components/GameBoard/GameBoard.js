import React, { Component } from "react";
import {UserStatusBar,OpponentStatusBar} from "./StatusBar/StatusBar";
import {UserArtifactSpace,OpponentArtifactSpace} from "./ArtifactSpace/ArtifactSpace";
import {DeckSpace} from "./DeckSpace/DeckSpace";
import {UserPlaySpace,OpponentPlaySpace} from "./PlaySpace/PlaySpace";
import {GoalCardSpace} from "./GoalCardSpace/GoalCardSpace";
import {TurnEndButton} from "./TurnEndButton/TurnEndButton";

import './GameBoard.css';
export default class GameBoard extends React.Component {
  render() {
    return (
        <div className={"the-story-game-board " + this.props.className}>
            <UserStatusBar/>
            <OpponentStatusBar/>
            <OpponentArtifactSpace/>
            <UserArtifactSpace/>
            <DeckSpace/>
            <OpponentPlaySpace/>
            <UserPlaySpace/>
            <GoalCardSpace/>
            <TurnEndButton/>
        </div>
    );
  }
}
