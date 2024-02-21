import { pieces } from '../gameLogic/pieceData';
import PieceBlock from './PieceBlock';
import './PieceBox.css';
import React, { useState, useEffect } from "react";

function PieceBox({ isBoxSelected, setSelectedBox, pieceMatrix, setPieceIndex }) {
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

    // fills board state on updates
    useEffect(() => {
        fillPiece();
    }, [piece]);

    return (
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
    );
}

export default PieceBox