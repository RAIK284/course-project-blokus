import React, { useState } from "react";
import "./StartOrJoinGameModal.css";
import { useNavigate } from "react-router-dom";
import Close from "../../assets/_X_.svg";
import BackButton from "../../assets/Back button.svg";
import {
  create_game,
  find_open_game,
  join_game,
  player_id,
  set_in_online_game,
  set_lobby_code,
  socket,
} from "../../gameLogic/lobbies";

function StartOrJoinGameModal({ isOpen, onClose }) {
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [onlineGameCode, setOnlineGameCode] = useState("");
  const navigate = useNavigate();

  const handleCreateGameClick = () => {
    setIsCreatingGame(true);
  };

  const handleCreateLocalGameClick = () => {
    set_lobby_code(-1);
    set_in_online_game(false);
    navigate(`/game`);
  };

  const handleCreateOnlineGameClick = () => {
    create_game();
  };

  socket.on("game_created", (data) => {
    let playerId = data["playerId"];
    if (playerId === player_id) {
      let lobbyCode = data["lobbyCode"];
      set_lobby_code(lobbyCode);
      set_in_online_game(true);
      join_game(lobbyCode);
    }
  });

  const handleJoinGameClick = () => {
    setIsJoiningGame(true);
  };

  const handleOnlineGameCodeKeyDown = (e) => {
    if (e.key === "Enter" && onlineGameCode.length === 6) {
      join_game(onlineGameCode);
    }
  };

  socket.on("joined_game", (data) => {
    let playerId = data["playerId"];
    if (playerId === player_id) {
      let lobbyCode = data["lobbyCode"];
      set_lobby_code(lobbyCode);
      set_in_online_game(true);
      navigate(`/game`);
    }
  });

  socket.on("lobby_full", (data) => {
    let playerId = data["playerId"];
    if (playerId === player_id) {
      let lobbyCode = data["lobbyCode"];
      console.log("Lobby " + lobbyCode + " full.");
    }
  });

  const handleJoinPublicGame = () => {
    find_open_game();
  };

  socket.on("open_game_found", (data) => {
    let playerId = data["playerId"];
    if (playerId === player_id) {
      let lobbyCode = data["lobbyCode"];
      set_lobby_code(lobbyCode);
      join_game(lobbyCode);
    }
  });

  socket.on("no_open_game_found", (data) => {
    let playerId = data["playerId"];
    if (playerId === player_id) {
      console.log("No open game found.");
    }
  });

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

  if (!isOpen) return null;

  return (
    <div className="StartOrJoinGameModal">
      <div className="modal-content">
        {(isCreatingGame || isJoiningGame) && (
          <div className="back-modal" onClick={handleBackClick}>
            <img src={BackButton} alt="Back Button" />
          </div>
        )}

        <div className="close-modal" onClick={handleCloseClick}>
          <img src={Close} alt="Close Modal Button" />
        </div>

        <div className="modal-buttons-container">
          {!isCreatingGame && !isJoiningGame && (
            <>
              <div
                className="create-game-button-container"
                onClick={handleCreateGameClick}
              >
                <span className="button-text">Create Game</span>
              </div>
              <span className="button-description">
                Create a local or online game that friends can join or play
                versus computer opponents!
              </span>
              <div style={{ height: "3em" }}></div>
              <div
                className="join-game-button-container"
                onClick={handleJoinGameClick}
              >
                <span className="button-text">Join Game</span>
              </div>

              <span className="button-description">
                Join a public game with players from around the world or a
                private game by entering your friend's unique game code!
              </span>
            </>
          )}
          {isCreatingGame && (
            <>
              <div
                className="local-game-button-container"
                onClick={handleCreateLocalGameClick}
              >
                <span className="button-text">Local Game</span>
              </div>

              <span className="button-description">
                Create a local game where all 4 opponents play from the same
                computer!
              </span>
              <div style={{ height: "3em" }}></div>

              <div
                className="online-game-button-container"
                onClick={handleCreateOnlineGameClick}
              >
                <span className="button-text">Online Game</span>
              </div>

              <span className="button-description">
                Create a private online game where all 4 opponents join using a
                code and play from separate computers!
              </span>
            </>
          )}

          {isJoiningGame && (
            <>
              <div className="online-game-code-button-container">
                <input
                  className="online-game-code-input"
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

              <span className="button-description">
                Join a private online game by entering a 6-letter code!
              </span>
              <div style={{ height: "4.25em" }}></div>

              <div
                className="public-game-button-container"
                onClick={handleJoinPublicGame}
              >
                <span className="button-text">Public Game</span>
              </div>

              <span className="button-description">
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
