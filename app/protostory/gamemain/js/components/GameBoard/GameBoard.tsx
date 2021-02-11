import React from "react";
import { UserStatusBar, OpponentStatusBar } from "./StatusBar/StatusBar";
import { UserSubCardSpace, OpponentSubCardSpace, SubCardSpaceProps } from "./SubCardSpace/SubCardSpace";
import { DeckSpace, DeckSpaceProps } from "./DeckSpace/DeckSpace";
import { UserPlaySpace, OpponentPlaySpace } from "./PlaySpace/PlaySpace";
import { TurnEndButton } from "./TurnEndButton/TurnEndButton";

import './GameBoard.css';
import { GameCardProps } from "Components/GameCard/GameCard";
import { DeckProps } from "./DeckSpace/Deck/Deck";
type GameBoardCardProp={
  cardName: string;
  highlight?: boolean;
  hoverInfo?: string;
}
type GameBoardDeckProp={
  deckName?: string;
  cardList: Array<GameBoardCardProp>;
}
type GameBoardProps={
  deckClickAction:(e:any,cardList:Array<GameCardProps>)=>void,
  subCardSpaceClickAction: (e: any, cardName: string, key: number) => void,
  playSpaceCardClickAction: (e: any, cardName: string, key: number) => void,
  turnEndButtonClickAction:(e:any)=>void,
  
  opponentName:string,
  userName:string,
  userStatus:object,
  opponentStatus:object,
  userSubCardList:Array<GameBoardCardProp>,
  opponentSubCardList:Array<GameBoardCardProp>,
  userPlaySpaceCardList:Array<GameBoardCardProp>,
  opponentPlaySpaceCardList:Array<GameBoardCardProp>,
  decks:Array<GameBoardDeckProp>,
  goalDecks:Array<GameBoardDeckProp>,
  children:any,
  disable:boolean,
}
function GameBoardDeckPropToDeckProps(gameBoardDeckProps:Array<GameBoardDeckProp>,onClick:(e: any, cardList: Array<GameCardProps>) => void):Array<DeckProps>{
  return gameBoardDeckProps.map((deckProp)=>{
    return {
      deckName: deckProp.deckName,
      onClick: onClick,
      cardList: deckProp.cardList
    }
  });
}
function GameBoadCardPropsToCardProps(gameBoardCardProps:Array<GameBoardCardProp>,onClick:(e:any,cardName:string,key:number)=>void):Array<GameCardProps>{
  return gameBoardCardProps.map((cardProp)=>{
    return{
      cardName:cardProp.cardName,
      highlight:cardProp.highlight,
      onClick:onClick,
      hoverInfo:cardProp.hoverInfo,
    }
  });

}
function GameBoard(props:GameBoardProps) {
  const deckProps=GameBoardDeckPropToDeckProps(props.decks,props.deckClickAction);
  const goalCardProps=GameBoardDeckPropToDeckProps(props.goalDecks,props.deckClickAction);
  const userSubCardProps=GameBoadCardPropsToCardProps(props.userSubCardList,props.subCardSpaceClickAction);
  const opponentSubCardProps=GameBoadCardPropsToCardProps(props.opponentSubCardList,props.subCardSpaceClickAction);
  const userPlaySpaceCardProps=GameBoadCardPropsToCardProps(props.userPlaySpaceCardList,props.playSpaceCardClickAction);
  const opponentPlaySpaceCardProps=GameBoadCardPropsToCardProps(props.opponentPlaySpaceCardList,props.playSpaceCardClickAction);
  return (
    <div className={"the-story-game-board"}>
      <UserStatusBar statusList={props.userStatus}/>
      <OpponentStatusBar statusList={props.opponentStatus}/>
      <OpponentSubCardSpace disable={props.disable} cardList={opponentSubCardProps} />
      <UserSubCardSpace disable={props.disable} cardList={userSubCardProps} />
      <OpponentPlaySpace disable={props.disable} cardProps={opponentPlaySpaceCardProps}/>
      <UserPlaySpace disable={props.disable} cardProps={userPlaySpaceCardProps} />
      <TurnEndButton onClick={props.turnEndButtonClickAction}/>
      <DeckSpace disable={props.disable} className="the-story-normal-card-deck-space" deckProps={deckProps} />
      <DeckSpace disable={props.disable} className="the-story-goal-card-deck-space" deckProps={goalCardProps} />
      {props.children}
    </div>
  );
}
export { GameBoard,GameBoardCardProp,GameBoardDeckProp,GameBoardProps }
