import React from 'react';
import { Card } from 'react-bootstrap';
import cardData from './cardData.yml';

class GameCardFactory {
    constructor() {
        console.log(cardData);
    }
    createGameCard(cardName=null,props={}) {
        if(cardName===null)
            throw new SyntaxError("GameCard react dom cannnot create with out card Name");
        if(typeof cardData[cardName]==="undefined")
            throw new SyntaxError("GameCard react dom cannnot create undefined card: "+cardName);
        const onClickFunc=typeof props.onClick === 'function'? (e)=>{props.onClick(e,cardName,props.key)}: null;
        return (
        <GameCard 
            cardTitle={cardData[cardName].cardTitle} 
            cardText={cardData[cardName].cardText}
            onClick={onClickFunc}
            key={typeof props.key !== "undefined"?props.key: null}
            />
        );
    }
    createGameCardList(cardList,props={}) {
        if(cardList.length >0)
            return cardList.map((card,index) => this.createGameCard(card,{...props,key:index}));
        throw new SyntaxError("Can not create GameCard list. it is not valid array");
    }
}

function GameCard(props) {
    return (
        <div className="the-story-game-card">
            <Card style={{ width: '18rem' }} onClick={props.onClick}>
                <Card.Header>
                    <Card.Title>{props.cardTitle}</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Text>
                        {props.cardText}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default new GameCardFactory();