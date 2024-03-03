import React, { useState } from "react";
import "./StartOrJoinGameModal.css";
import { Link, useNavigate } from "react-router-dom";
import Close from "../../assets/_X_.svg";
import BackButton from "../../assets/Back button.svg";

function StartOrJoinGameModal({ isOpen, onClose }) {
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [onlineGameCode, setOnlineGameCode] = useState("");
  const navigate = useNavigate();

  const handleCreateGameClick = () => {
    setIsCreatingGame(true);
  };

  const handleJoinGameClick = () => {
    setIsJoiningGame(true);
  };

  const handleBackClick = () => {
    setOnlineGameCode("");
    if (isCreatingGame) {
      setIsCreatingGame(false);
    } else if (isJoiningGame) {
      setIsJoiningGame(false);
    }
  };

  const handleCloseClick = () => {
    setOnlineGameCode("");
    setIsCreatingGame(false);
    setIsJoiningGame(false);
    onClose();
  };

  const handleOnlineGameCodeKeyDown = (e) => {
    if (e.key === "Enter" && onlineGameCode.length === 6) {
      navigate(`/game`);
    }
  };

  if (!isOpen) return null;

  return (
    <div id="modalOverlay">
      <div id="modal">
        {(isCreatingGame || isJoiningGame) && (
          <div id="backModal" onClick={handleBackClick}>
            <img src={BackButton} alt="Back Button" />
          </div>
        )}

        <div id="closeModal" onClick={handleCloseClick}>
          <img src={Close} alt="Close Modal Button" />
        </div>

        <div id="modalButtonsContainer">
          {!isCreatingGame && !isJoiningGame && (
            <>
              <div
                id="createGameButtonContainer"
                onClick={handleCreateGameClick}
              >
                <span id="createGameText">Create Game</span>
              </div>
              <span id="createGameDescription">
                Create a local or online game that friends can join or play
                versus computer opponents!
              </span>
              <div style={{ height: "3em" }}></div>
              <div id="joinGameButtonContainer" onClick={handleJoinGameClick}>
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
                  <span id="localGameText">Local Game</span>
                </div>
              </Link>

              <span id="localGameDescription">
                Create a local game where all 4 opponents play from the same
                computer!
              </span>
              <div style={{ height: "3em" }}></div>

              <Link to="/game">
                <div id="onlineGameButtonContainer">
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
              <div id="onlineGameCodeButtonContainer">
                <input
                  id="onlineGameCodeInput"
                  type="text"
                  placeholder="Enter Game Code"
                  value={onlineGameCode}
                  onChange={(e) =>
                    setOnlineGameCode(e.target.value.toUpperCase())
                  }
                  onKeyDown={handleOnlineGameCodeKeyDown}
                  maxLength={6}
                />
              </div>

              <span id="onlineGameDescription">
                Join a private online game by entering a 6-letter code!
              </span>
              <div style={{ height: "4.25em" }}></div>

              <Link to="/game">
                <div id="publicGameButtonContainer">
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
      </div>
    </div>
  );
}

export default StartOrJoinGameModal;
