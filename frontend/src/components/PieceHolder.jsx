import { pieces } from '../gameLogic/pieceData';
import PieceBox from './PieceBox';
import './PieceHolder.css';
import React, { useState, useEffect } from "react";

function PieceHolder({ setPiece, userPieces, myPlayer, selectedBox, setSelectedBox }) {
    return (
        <div id="pieceHolder">
            {pieces.map((piece, index) => (
                <PieceBox 
                    hasPieceBeenPlayed={userPieces[myPlayer][index] === false} 
                    isBoxSelected={selectedBox === index} 
                    setSelectedBox={() => setSelectedBox(selectedBox === index ? -1 : index)}
                    setPieceIndex={() => setPiece(index)} 
                    pieceMatrix={piece}
                />
            ))}
        </div>
    );
}

export default PieceHolder