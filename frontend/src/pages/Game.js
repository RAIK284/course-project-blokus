import React from 'react';
import Block from '../components/Block';
import '../styles/pages/Game.css';

function Game() {
    // creates a 20x20 grid of block components
    const rows = Array.from({ length: 20 }, (_, rowIndex) => (
        <div className="row" key={rowIndex}>
            {Array.from({ length: 20 }, (_, colIndex) => (
                <Block key={`${rowIndex}-${colIndex}`} />
            ))}
        </div>
    ));

    return (
        <div id="game">
            <div id="boardContainer">
                {rows}
            </div>
        </div>
    );
}

export default Game;