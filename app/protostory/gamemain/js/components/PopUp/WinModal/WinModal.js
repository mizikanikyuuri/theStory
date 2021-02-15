import React from "react";
import Modal from "react-modal";
import 'Components/ThirdParty/StretchyButton.scss';
import './WinModal.css';
Modal.setAppElement("#app");
const leaveGame=()=>{
  window.location.href = "/portal/";
}
function WinModal({className,...passThroughProps}) {
  return (
    <Modal className={"win-modal "+className} onRequestClose={leaveGame} {...passThroughProps}  >
      <p class="win-modal-text">YOU WON</p>
      <button class="win-modal-sub-text stretchyButton" onClick={leaveGame} >Click to back</button>
    </Modal>
  );
}

export{WinModal}