import React from 'react'
import GameCard from "Components/GameCard"
import './Deck.css';
function Deck(props) {
    return (
        <div className={"the-story-deck "+props.className}>
            <GameCard/>
        </div>
    );
}

function MarketDeck(props){
    return (
        <Deck className={"the-story-market-deck "+props.className}/>
        );
}
function DangeonDeck(props){
    return (
        <Deck className={"the-story-dangeon-deck "+props.className}/>
        );
}
function ChurchDeck(props){
    return (
        <Deck className={"the-story-church-deck "+props.className}/>
        );
}
export {MarketDeck,DangeonDeck,ChurchDeck}
