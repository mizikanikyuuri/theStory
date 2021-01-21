import React from 'react'
import { Deck,DeckProps } from "./Deck/Deck"
import './DeckSpace.css';
type DeckSpaceProps={
    className:string,
    deckProps:Array<DeckProps>
    disable?:boolean
}
function DeckSpace({ className ,deckProps,disable=false, ...passThroughProps}:DeckSpaceProps) {
    const deckDom=deckProps.map((deck,index) => {
        return <Deck 
                    className={"the-story-deck-space-deck "+deck.className!==undefined?deck.className:""} 
                    deckName={""}
                    key={index}
                    disable={disable}
                    onClick={deck.onClick!==undefined?deck.onClick:null}
                    cardList={deck.cardList!==undefined?deck.cardList:[]} 
                    />
    });
    return (
        <div className={"the-story-deck-space " + className} {...passThroughProps}>
            {deckDom}
        </div>
    );
}

export { DeckSpace,DeckSpaceProps }
