import React, { useState, useEffect } from "react";
import "./Game.css";
import Board from "../components/Board";
import PieceHolder from "../components/PieceHolder";
import { currentPlayerTurnIndex, player_pieces, players } from "../gameLogic/playerData";

function Game() {
  const [pieceIndex, setPieceIndex] = useState(-1);
  const [userPieces, setUserPieces] = useState(player_pieces);
  const [myPlayer, setMyPlayer] = useState(players[currentPlayerTurnIndex]);
  const [selectedBox, setSelectedBox] = useState(-1);

  return (
    <div id="game">
      <div id="boardHolder">
        <div id="boardOutline">
          <Board 
            pieceIndex={pieceIndex} 
            setUserPieces={setUserPieces} 
            myPlayer={myPlayer} 
            setMyPlayer={setMyPlayer}
            setSelectedBox={setSelectedBox}
          />
        </div>
      </div>
      <PieceHolder 
        setPiece={setPieceIndex} 
        userPieces={userPieces} 
        myPlayer={myPlayer}
        selectedBox={selectedBox}
        setSelectedBox={setSelectedBox}
      />
    </div>
  );
}

export default Game;
