import React from "react";
import Modal from "react-modal";
import 'Components/ThirdParty/StretchyButton.scss';
import './LoseModal.css';
Modal.setAppElement("#app");

const leaveGame=()=>{
  window.location.href = "/portal/";
}
function LoseModal({className,...passThroughProps}) {
  return (
    <Modal className={"lose-modal "+className} onRequestClose={leaveGame} {...passThroughProps}  >
      <p class="lose-modal-text">YOU LOST</p>
      <button class="lose-modal-sub-text stretchy-button" onClick={leaveGame} >Click to back</button>
    </Modal>
  );
}
export{LoseModal}
