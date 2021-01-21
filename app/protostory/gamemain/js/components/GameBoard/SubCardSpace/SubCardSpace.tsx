import React from 'react'
import {GameCardFactory,GameCardProps} from "Components/GameCard/GameCard"
import './SubCardSpace.css';
type SubCardSpaceProps={
    className:string,
    disable?:boolean,
    cardList:Array<GameCardProps>,
}
function SubCardSpace({className="",disable=false,cardList=[]}:SubCardSpaceProps) {
    if(disable)
        cardList=cardList.map(cardProp=>{cardProp.disable=disable;return cardProp;});
    const cardDom=GameCardFactory.createGameCardList(cardList);
    return (
        <div className={"the-story-sub-card-space "+className}>
            {cardDom}
        </div>
    );
}

function UserSubCardSpace({className="",cardList=[], ...passThroughProps}){
    return (
        <SubCardSpace className={"the-story-user-sub-card-space "+className} cardList={cardList} {...passThroughProps}/>
        );
}
function OpponentSubCardSpace({className="",cardList=[], ...passThroughProps}){
    return (
        <SubCardSpace className={"the-story-opponent-sub-card-space "+className} cardList={cardList} {...passThroughProps}/>
        );
}
export {SubCardSpaceProps,UserSubCardSpace,OpponentSubCardSpace}
