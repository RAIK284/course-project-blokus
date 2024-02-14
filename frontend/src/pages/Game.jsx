import React, { useState, useEffect } from "react";
import "./Game.css";
import axios from "axios";
import Board from "../components/Board";
import NavBar from "../components/NavBar.jsx";

function Game() {
  return (
    <div id="game">
      <NavBar></NavBar>
      <Board />
    </div>
  );
}

export default Game;
