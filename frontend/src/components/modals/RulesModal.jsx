import React from "react";
import "./RulesModal.css";
import Close from "../../assets/_X_.svg";

function RulesModal({ isOpen, onClose }) {
  const handleCloseClick = () => {
    onClose();
  };

  return (
    isOpen && (
      <div id="rumodaloverlay">
        <div id="rumodal">
          <div id="rucloseModal" onClick={handleCloseClick}>
            <img src={Close} alt="Close Modal Button" />
          </div>
          <div id="rumodalcontent">
            <div class="ruwelcomemessage">Rules:</div>
            <object
              id="rupdf"
              type="application/pdf"
              data="https://service.mattel.com/instruction_sheets/BJV44-Eng.pdf"
              aria-label="game rules"
            ></object>
          </div>
        </div>
      </div>
    )
  );
}

export default RulesModal;
