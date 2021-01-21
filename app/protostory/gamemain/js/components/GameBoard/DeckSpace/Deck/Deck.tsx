import React from 'react'
import {GameCardFactory,GameCardProps} from "Components/GameCard/GameCard"
import './Deck.css';
type DeckProps={
    className?:string,
    deckName?:string,
    key?:number
    disable?:boolean,
    onClick:(e:any,cardList:Array<GameCardProps>)=>void,
    cardList:Array<GameCardProps>
}
function Deck({className="",deckName="",key=null,disable=false,onClick=undefined,cardList=[]}:DeckProps) {
    if(Array.isArray(cardList)&&cardList.length <=0)
        throw new SyntaxError("Can not create Deck. cardList is not valid array");
    cardList=cardList.map(cardProps=>{cardProps.disable=disable;return cardProps;});
    const onClickFunc=typeof onClick === 'function'? (e)=>{onClick(e,cardList)}: null;
    return (
        <div className={"the-story-deck "+className} key={key} onClick={disable?()=>{}:onClickFunc} >
            {deckName}
            <div className={"the-story-deck-card-container"}>
                {GameCardFactory.createGameCardList(cardList)}
            </div>
        </div>
    );
}

export {Deck,DeckProps}