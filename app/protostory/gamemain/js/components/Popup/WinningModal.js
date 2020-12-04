import React from "react";
import "./styles.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function WinningModal() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  return (
      <Modal isOpen={modalIsOpen}>
        <button onClick={() => setIsOpen(false)}>Close Modal</button>
      </Modal>
  );
}

export{WinningModal}