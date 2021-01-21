import React,{ useState }  from "react";
import Modal from "react-modal";
import {GameCardFactory} from "Components/GameCard/GameCard"
import Button from 'react-bootstrap/Button'
import './CardSelector.css';
Modal.setAppElement("#app");
type CardSelectorProps={
  className?:string,
  callBack:(selectedCardName:string)=>void,
  cardList:Array<string>,
  passThroughProps?:any
}
function CardSelector({ className="", callBack, cardList , ...passThroughProps }:CardSelectorProps) {
  const [selectedCardName, setCardName] = useState(null);
  const [modalOpen, setModalOpen] = useState(true);
  if (!Array.isArray(cardList) || cardList.length <= 0)
    throw new SyntaxError("Can not create Deck. cardList is not valid array");
  const handleRequestCloseFunc = ()=>{
    if( typeof callBack === 'function')
       callBack(selectedCardName);
       setModalOpen(false);
    };
  const cardListDom=cardList.map(
    (cardName,index)=>{
      const cardProps={
        cardName:cardName,
        key:index,
        onClick: (e:any,cardName:string,key:number) => { setCardName(cardName) } ,
        highlight:cardName===selectedCardName?true:false
      };
      return GameCardFactory.createGameCard(cardProps);
    }
  );
  return (
    <Modal className={"card-selector " + className} isOpen={modalOpen} onRequestClose={handleRequestCloseFunc} {...passThroughProps}  >
      <p className="card-selector-text">CHOOSE A CARD</p>
      <div className="selecting-cards-container">
        {cardListDom}
      </div>
      <Button variant="secondary" active={selectedCardName!==null?true:false} size="lg" className={"the-story-card-selector-button"} onClick={handleRequestCloseFunc}>
        complete
      </Button>
    </Modal>
  );
}
export { CardSelectorProps,CardSelector }
