import React from 'react'
import {GameCardFactory,GameCardProps} from "Components/GameCard/GameCard"

import './PlaySpace.css';
type placeSpaceProps={
    className:string,
    disable?:boolean,
    cardProps:Array<GameCardProps>,
}
function PlaySpace({className=null,disable=false,cardProps}:placeSpaceProps) {
    cardProps=cardProps.map(cardProp=>{cardProp.disable=disable;return cardProp;});
    const placedCardDom=GameCardFactory.createGameCardList(cardProps);
    return (
        <div className={"the-story-play-space " + className} >
            {placedCardDom}
        </div>
    );
}
function UserPlaySpace({ className="",cardProps=[], ...passThroughProps } ){
    return (
            <PlaySpace className={"the-story-user-play-space " + className} cardProps={cardProps} {...passThroughProps}/>
    );
}


function OpponentPlaySpace({ className="",cardProps=[], ...passThroughProps }){
    return (
            <PlaySpace className={"the-story-opponent-play-space " + className} cardProps={cardProps} {...passThroughProps}/>
    );
}
export { UserPlaySpace,OpponentPlaySpace }
