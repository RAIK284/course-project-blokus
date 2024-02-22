import { pieces, rotate_piece, flip_piece } from '../gameLogic/pieceData';
import PieceBlock from './PieceBlock';
import './PieceBox.css';
import React, { useState, useEffect } from "react";

function PieceBox({ hasPieceBeenPlayed, isBoxSelected, setSelectedBox, pieceIndex, setPieceIndex, pieceMatrix }) {
    const [piece, setPiece] = useState(pieceMatrix);
    const [displayRows, setDisplayRows] = useState([]);

    // creates a rendering of block components based on piece 2d matrix
    const fillPiece = () => {
        const newDisplayRows = [];
        for (let row = 0; row < piece.length; row++) {
            const newRow = [];
            for (let col = 0; col < piece[row].length; col++) {
                newRow.push(piece[row][col] === 1 ? <PieceBlock show={true} /> : <PieceBlock show={false} />);
            }
            newDisplayRows.push(newRow);
        }
        setDisplayRows(newDisplayRows);
    };

    const handleClick = () => {
        setPieceIndex();
        setSelectedBox();
    }

    useEffect(() => {
        const keyPressHandler = (event) => {
          if (event.key === 'r' && isBoxSelected) {
            rotate_piece(pieceIndex);
            setPiece(pieces[pieceIndex]);
            fillPiece();
          } else if (event.key === 'f' && isBoxSelected) {
            flip_piece(pieceIndex);
            setPiece(pieces[pieceIndex]);
            fillPiece();
          }
        };
        window.addEventListener('keydown', keyPressHandler);
      }, [isBoxSelected]);

    // fills board state on updates
    useEffect(() => {
        fillPiece();
    }, [piece]);

    return (
        <>
        {   
            hasPieceBeenPlayed == false && 
            <div className={`pieceBox ${isBoxSelected ? 'clicked' : ''}`} onClick={handleClick}>
                <div>
                    {displayRows.map((row, rowIndex) => (
                        <div class="pieceRow" key={rowIndex}>
                            {row.map((block, colIndex) => (
                                <React.Fragment key={colIndex}>{block}</React.Fragment>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        }
        </>
    );
}

export default PieceBox