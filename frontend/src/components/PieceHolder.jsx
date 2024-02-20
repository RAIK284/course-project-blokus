import { pieces } from '../gameLogic/pieceData';
import PieceBox from './PieceBox';
import './PieceHolder.css';
import React, { useState, useEffect } from "react";

function PieceHolder() {
    return (
        <div id="pieceHolder">
            {pieces.map((piece, index) => (
                <PieceBox key={index} pieceMatrix={piece} />
            ))}
        </div>
    );
}

export default PieceHolder