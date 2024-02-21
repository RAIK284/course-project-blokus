import { pieces } from '../gameLogic/pieceData';
import PieceBox from './PieceBox';
import './PieceHolder.css';
import React, { useState, useEffect } from "react";

function PieceHolder({ setPiece }) {
    const [selectedBox, setSelectedBox] = useState(-1);

    return (
        <div id="pieceHolder">
            {pieces.map((piece, index) => (
                <PieceBox 
                    isBoxSelected={selectedBox === index} 
                    setSelectedBox={() => setSelectedBox(index)}
                    setPieceIndex={() => setPiece(index)} 
                    pieceMatrix={piece} 
                />
            ))}
        </div>
    );
}

export default PieceHolder