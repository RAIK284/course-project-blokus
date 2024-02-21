import React, { useState, useEffect } from "react";
import "./Game.css";
import axios from "axios";
import Board from "../components/Board";
import PieceHolder from "../components/PieceHolder";

function Game() {
  const [pieceIndex, setPieceIndex] = useState(-1);

  return (
    <div id="game">
      <div id="boardHolder">
        <div id="boardOutline">
          <Board pieceIndex={pieceIndex} />
        </div>
      </div>
      <PieceHolder setPiece={setPieceIndex} />
    </div>
  );
}

export default Game;
