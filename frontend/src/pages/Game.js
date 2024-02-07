import React, { useState, useEffect } from 'react';
import '../styles/pages/Game.css';
import axios from "axios";
import Board from '../components/Board';

function Game() {
    return (
        <div id="game">
            <Board />
        </div>
    );
}

export default Game;