import React from "react";
import "./StartOrJoinGameModal.css";
import { Link } from "react-router-dom";

function UserProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Play Game</h2>
        <button onClick={onClose}>Close</button>
        <Link to="/game">
          <button id="playGame">Play Game</button>
        </Link>
      </div>
    </div>
  );
}

export default UserProfileModal;
