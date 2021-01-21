import React from "react";
import Modal from "react-modal";
import 'Components/ThirdParty/StretchyButton.scss';
import './WinModal.css';
Modal.setAppElement("#app");

function WinModal({className,...passThroughProps}) {
  return (
    <Modal className={"win-modal "+className} onRequestClose={() => { window.location.href = "http://localhost:8080/portal/" }} {...passThroughProps}  >
      <p class="win-modal-text">YOU WON</p>
      <button class="win-modal-sub-text stretchyButton">Click to back</button>
    </Modal>
  );
}

export{WinModal}