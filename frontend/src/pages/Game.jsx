import React, { useState, useEffect } from "react";
import "./Game.css";
import axios from "axios";
import Board from "../components/Board";
import PieceHolder from "../components/PieceHolder";
import NavBar from "../components/NavBar";

function Game() {
  return (
    <div id="game">
      <NavBar />
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
