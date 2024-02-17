import React, { useState, useEffect } from "react";
import "./Game.css";
import axios from "axios";
import Board from "../components/Board";
import PieceHolder from "../components/PieceHolder";

function Game() {
  return (
    <div id="game">
      <div id="boardHolder">
        <div id="boardOutline">
          <Board />
        </div>
      </div>
      <PieceHolder />
    </div>
  );
}

export default Game;
