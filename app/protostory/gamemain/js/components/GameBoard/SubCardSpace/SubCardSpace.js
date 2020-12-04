import React from 'react'
import GameCardFactory from "Components/GameCard/GameCard"
import './SubCardSpace.css';
function SubCardSpace({className,cardNameList,cardProps}) {
    let cardDom=null;
    if(Array.isArray(cardNameList)&&cardNameList.length>0)
        cardDom=GameCardFactory.createGameCardList(cardNameList,cardProps);
    return (
        <div className={"the-story-sub-card-space "+className}>
            {cardDom}
        </div>
    );
}

function UserSubCardSpace({className, ...passThroughProps}){
    return (
        <SubCardSpace className={"the-story-user-sub-card-space "+className} {...passThroughProps}/>
        );
}
function OpponentSubCardSpace({className, ...passThroughProps}){
    return (
        <SubCardSpace className={"the-story-opponent-sub-card-space "+className} {...passThroughProps}/>
        );
}
export {UserSubCardSpace,OpponentSubCardSpace}
