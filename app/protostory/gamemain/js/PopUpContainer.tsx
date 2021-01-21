import { GameState } from "js/GameRules/GameState/GameState";
import { Player } from "./GameRules/CommonGameObjects";
import {  InputQueue , SingleCardSelect } from "./GameRules/GameState/InputQueue";
import { CardSelector } from 'Components/PopUp/CardSelector/CardSelector';
import { LoseModal } from 'Components/PopUp/LoseModal/LoseModal';
import { WinModal } from 'Components/PopUp/WinModal/WinModal';
import React from "react";
type PopUpContainerProps = {
  gameState: GameState
};

function PopUpContainer(props: PopUpContainerProps) {
  let popUp = [];
  props.gameState.inputWaitingQueue.forEach(
    (inputQueue,key)=>{
      if(inputQueue instanceof SingleCardSelect)
        popUp.push(<CardSelector {...inputQueue.getJsxProps()}/>);
    }
  );
  if (props.gameState.winner === Player.user)
    popUp.push( <WinModal isOpen={true}/>);
  if (props.gameState.winner === Player.opponent)
    popUp.push( <LoseModal isOpen={true}/>);
  return (
    <div className={"the-story-pop-up-container"}>
      {popUp}
    </div>
  );
}
export { PopUpContainer }
