import React from 'react'
import { MarketDeck, DangeonDeck, ChurchDeck } from "./Deck/Deck"
import './DeckSpace.css';
function DeckSpace(props) {
    return (
        <div className={"the-story-deck-space " + props.className}>
            <MarketDeck className="the-story-deck-space-first-deck" />
            <DangeonDeck className="the-story-deck-space-deck" />
            <ChurchDeck className="the-story-deck-space-deck" />
        </div>
    );
}

export { DeckSpace }
