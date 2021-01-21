import React from 'react';
import { Card } from 'react-bootstrap';
import { cardData } from "./CardData"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './GameCard.css';
type GameCardProps={
    cardName:string,
    key?:number,
    highlight?:boolean,
    disable?:boolean,
    onClick?:(e:any,cardName:string,key:number)=>void,
    hoverInfo?:string,
}
class GameCardFactoryClass{
    createGameCard(
        {cardName=null,
        key=undefined,
        highlight=undefined,
        disable=false,
        onClick=undefined,
        hoverInfo=undefined
        }:GameCardProps
    ){
        if (cardName === null)
            throw new SyntaxError("GameCard react dom cannnot create with out card Name");
        if (typeof cardData[cardName] === "undefined")
            throw new SyntaxError("GameCard react dom cannnot create undefined card: " + cardName);
        const onClickFunc = typeof onClick === 'function' ? (e) => { onClick(e, cardName, key) } : null;
        return (
            <GameCard
                cardTitle={cardData[cardName].cardTitle}
                cardText={cardData[cardName].cardText}
                highlight={highlight}
                hoverInfo={hoverInfo}
                disable={disable}
                onClick={disable?()=>{}:onClickFunc}
                key={typeof key !== "undefined" ? key : null}
            />
        );
    }
    createGameCardByName(cardName:string){
        return this.createGameCard({cardName:cardName});
    }
    createGameCardList(cardList:Array<GameCardProps>){
        if(cardList===null||typeof cardList ==='undefined')
            throw new SyntaxError("Can not create GameCard list. it is not valid array");
        if (cardList.length > 0)
            return cardList.map((cardProp, index) => this.createGameCard( { ...cardProp, key: index }));
        if (cardList.length ==0)
            return null;
    }
    createGameCardListByName(cardNameList:Array<string>){
        if(cardNameList===null||typeof cardNameList ==='undefined')
            throw new SyntaxError("Can not create GameCard list. it is not valid array");
        if (cardNameList.length > 0)
            this.createGameCardList(cardNameList.map((cardName)=>{return {cardName:cardName}}));
        if (cardNameList.length ==0)
            return null;
    }
}

function GameCard(props) {
    let hoverInfo = null;
    if(props.hoverInfo!==undefined&&props.hoverInfo!==""){
        hoverInfo = 
            <Tooltip style={{ fontSize: '2rem' }} id="button-tooltip" >
                {props.hoverInfo}
            </Tooltip>;
    }
    const bg=props.disable?'dark':'light';
    const border = props.highlight === true ? "warning" : "black";
    const wideBorder = props.highlight === true ? " the-story-game-card-wide-border" : "";
    const cardDom=
            <Card className={"the-story-game-card"+wideBorder}bg={bg} border={border} onClick={props.onClick}>
                <Card.Header>
                    <Card.Title>{props.cardTitle}</Card.Title>
                </Card.Header>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Text>
                        {props.cardText}
                    </Card.Text>
                </Card.Body>
            </Card>;
    if(hoverInfo===null)
        return cardDom;
    return (
        <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={hoverInfo}
        >
            {cardDom}
        </OverlayTrigger>
    );
}
const GameCardFactory=new GameCardFactoryClass();
export {GameCardProps,GameCardFactory,}