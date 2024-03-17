import React, { useState } from "react";
import "./RulesModal.css";
import { Link, useNavigate } from "react-router-dom";
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
            <div class="ruwelcomemessage">
              The Rules of Blokus:
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default RulesModal;
