import React, { useState, useEffect } from "react";
import "./Game.css";
import Board from "../components/Board";
import PieceHolder from "../components/PieceHolder";
import { currentPlayerTurnIndex, player_pieces, players } from "../gameLogic/playerData";
import { reset_game } from "../gameLogic/board";
import KeyHolder from "../components/KeyHolder";
import Avatar from "../components/Avatar";

function Game() {
  // timer values
  const timerLength = 59;
  const playerTime = new Date();
  playerTime.setSeconds(playerTime.getSeconds() + timerLength);

  // data for current user playing
  const [myPlayer, setMyPlayer] = useState(players[currentPlayerTurnIndex]);
  const [pieceIndex, setPieceIndex] = useState(-1);
  const [userPieces, setUserPieces] = useState(player_pieces);
  const [selectedBox, setSelectedBox] = useState(-1);

  const endRound = () => {
    setPieceIndex(-1);
    setUserPieces(player_pieces);
    setSelectedBox(-1);
    setMyPlayer(players[currentPlayerTurnIndex]);
  }

  // resets old game before starting new game
  useEffect(() => {
    reset_game();
    endRound();
  }, []);

  return (
    <div id="game">
      <div id="boardHolder">
        <div id="avatarHolder">
          <Avatar player="blue" />
          <Avatar player="yellow" />
        </div>
        <div id="boardOutline">
          <Board
            pieceIndex={pieceIndex}
            myPlayer={myPlayer}
            expiryTimestamp={playerTime}
            endRound={endRound}
          />
        </div>
        <div id="avatarHolder">
          <Avatar player="red" />
          <Avatar player="green" />
        </div>
      </div>
      <PieceHolder
        setPiece={setPieceIndex}
        userPieces={userPieces}
        myPlayer={myPlayer}
        selectedBox={selectedBox}
        setSelectedBox={setSelectedBox}
      />
      <KeyHolder />
    </div>
  );
}

export default Game;
