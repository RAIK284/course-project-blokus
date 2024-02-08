import React, { useState, useEffect } from 'react';
import Block from './Block';
import '../styles/components/Board.css';
import { board_matrix, can_play_piece } from '../gameLogic/board';
import { pieces } from '../gameLogic/piece_data';

function Board() {
    const [board, setBoard] = useState(board_matrix);
    const [displayRows, setDisplayRows] = useState([]);
    const [pieceIndex, setPieceIndex] = useState(0);

    // creates a 20x20 grid of block components based on board 2d matrix
    const fillBoard = () => {
        let boardComponents = board.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
                {row.map((cell, colIndex) => (
                    <Block 
                        onHover={() => checkIfPiecePlayable(colIndex, rowIndex)}
                        onMouseLeave={() => removeHighlightsFromBoard()}
                        player={board[colIndex][rowIndex] !== '' ? board[colIndex][rowIndex] : null}
                        highlight={board[colIndex][rowIndex] == 'highlight'}
                    />
                ))}
            </div>
        ));
        setDisplayRows(boardComponents);
    }

    const setBoardHighlights = (row, col) => {
        setBoard(prevBoard => {
            const updatedBoard = [...prevBoard];
            const piece = pieces[pieceIndex];
            for (let pieceR = 0; pieceR < piece.length; pieceR++){
                for (let pieceC = 0; pieceC < piece[pieceR].length; pieceC++){
                    if (piece[pieceR][pieceC] === 1){
                        updatedBoard[row + pieceR][col + pieceC] = 'highlight';
                    }
                }
            }
            return updatedBoard;
        });
    };

    const removeHighlightsFromBoard = () => {
        const updatedBoard = board.map(row =>
            row.map(cell => (cell === 'highlight' ? '' : cell))
        );
        setBoard(updatedBoard);
    };

    const checkIfPiecePlayable = async (row, col) => {
        const showHighlight = can_play_piece(row, col, pieceIndex, 'red');
        if (showHighlight){
            setBoardHighlights(row, col);
        }
    }

    // fills board state on updates
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