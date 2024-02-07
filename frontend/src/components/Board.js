import React, { useState, useEffect } from 'react';
import Block from './Block';
import '../styles/components/Board.css';
import axios from "axios";

function Board() {
    const [board, setBoard] = useState([]);
    const [displayRows, setDisplayRows] = useState([]);

    // creates a 20x20 grid of block components based on board 2d matrix
    const fillBoard = () => {
        let boardComponents = board.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
                {row.map((cell, colIndex) => (
                    <Block 
                        player={board[rowIndex][colIndex] !== '' ? board[rowIndex][colIndex] : null}
                        key={`${rowIndex}-${colIndex}`} 
                    />
                ))}
            </div>
        ));
        setDisplayRows(boardComponents);
    }

    const fetchBoard = async () => {
        const post = await axios.get('http://localhost:5000/get_board');
        setBoard(post.data);
    }

    // fetches board data from backend on page load
    useEffect(() => {
        fetchBoard();
    }, []);

    // fills board state once board data is fetched from backend
    useEffect(() => {
        fillBoard();
    }, [board]);

    return (
        <div id="board">
            <div id="boardContainer">
                {displayRows}
            </div>
        </div>
    );
}

export default Board;