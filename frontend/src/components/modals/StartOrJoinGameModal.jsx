import React, { useState } from "react";
import "./StartOrJoinGameModal.css";
import { Link } from "react-router-dom";
import Close from "../../assets/_X_.svg";
import GreenStartPiece from "../../assets/Rectangle Green.svg";
import BlueStartPiece from "../../assets/Rectangle Blue.svg";

function StartOrJoinGameModal({ isOpen, onClose }) {
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [isJoiningGame, setIsJoiningGame] = useState(false);

  const handleCreateGameClick = () => {
    setIsCreatingGame(true);
  };

  const handleJoinGameClick = () => {
    setIsJoiningGame(true);
  };

  const handleBackClick = () => {
    if (isCreatingGame) {
      setIsCreatingGame(false);
    } else if (isJoiningGame) {
      setIsJoiningGame(false);
    }
  };

  const handleCloseClick = () => {
    setIsCreatingGame(false);
    setIsJoiningGame(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div id="modalOverlay">
      <div id="modal">
        {(isCreatingGame || isJoiningGame) && (
          <div id="backModal" onClick={handleBackClick}>
            back
          </div>
        )}

        <div id="closeModal" onClick={handleCloseClick}>
          <img src={Close} alt="Close" />
        </div>

        <div id="modalButtonsContainer">
          {!isCreatingGame && !isJoiningGame && (
            <>
              <div
                id="createGameButtonContainer"
                onClick={handleCreateGameClick}
              >
                <img src={GreenStartPiece} alt="GreenStartPiece" />
                <span id="createGameText">Create Game</span>
              </div>
              <span id="createGameDescription">
                Create a local or online game that friends can join or play
                versus computer opponents!
              </span>
              <div id="joinGameButtonContainer" onClick={handleJoinGameClick}>
                <img src={BlueStartPiece} alt="BlueStartPiece" />
                <span id="joinGameText">Join Game</span>
              </div>

              <span id="joinGameDescription">
                Join a public game with players from around the world or a
                private game by entering your friend's unique game code!
              </span>
            </>
          )}
          {isCreatingGame && (
            <>
              <Link to="/game">
                <div id="localGameButtonContainer">
                  <img src={GreenStartPiece} alt="GreenStartPiece" />
                  <span id="localGameText">Local Game</span>
                </div>
              </Link>

              <span id="localGameDescription">
                Create a local game where all 4 opponents play from the same
                computer!
              </span>

              <Link to="/game">
                <div id="onlineGameButtonContainer">
                  <img src={BlueStartPiece} alt="BlueStartPiece" />
                  <span id="onlineGameText">Online Game</span>
                </div>
              </Link>

              <span id="onlineGameDescription">
                Create a private online game where all 4 opponents join using a
                code and play from separate computers!
              </span>
            </>
          )}

          {isJoiningGame && (
            <>
              <Link to="/game">
                <div
                  id="onlineGameCodeButtonContainer"
                  onClick={handleCreateGameClick}
                >
                  <img src={GreenStartPiece} alt="GreenStartPiece" />
                  <span id="onlineGameText">Online Game</span>
                </div>
              </Link>

              <span id="onlineGameDescription">
                Join an private online game by entering a 6-letter code!
              </span>

              <div id="enterCode">Enter Code</div>

              <Link to="/game">
                <div
                  id="onlineGameButtonContainer"
                  onClick={handleJoinGameClick}
                >
                  <img src={BlueStartPiece} alt="BlueStartPiece" />
                  <span id="publicGameText">Public Game</span>
                </div>
              </Link>

              <span id="publicGameDescription">
                Drop into a public game and compete against players across the
                world!
              </span>
            </>
          )}
        </div>

        {/* <Link to="/game">
          <button id="playGame">Play Game</button>
        </Link> */}
      </div>
    </div>
  );
}

export default StartOrJoinGameModal;
