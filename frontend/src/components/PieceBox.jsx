import { pieces, rotate_piece, flip_piece } from "../gameLogic/pieceData";
import PieceBlock from "./PieceBlock";
import "./PieceBox.css";
import React, { useState, useEffect } from "react";

function PieceBox({
  myPlayer,
  hasPieceBeenPlayed,
  isBoxSelected,
  setSelectedBox,
  pieceIndex,
  setPieceIndex,
}) {
  const [piece, setPiece] = useState(pieces[pieceIndex]);
  const [displayRows, setDisplayRows] = useState([]);

  // creates a rendering of block components based on piece 2d matrix
  const fillPiece = () => {
    const newDisplayRows = [];
    for (let row = 0; row < piece.length; row++) {
      const newRow = [];
      for (let col = 0; col < piece[row].length; col++) {
        newRow.push(
          piece[row][col] === 1 ? (
            <PieceBlock show={true} player={myPlayer} />
          ) : (
            <PieceBlock show={false} />
          )
        );
      }
      newDisplayRows.push(newRow);
    }
    setDisplayRows(newDisplayRows);
  };

  const handleClick = () => {
    setPieceIndex();
    setSelectedBox();
  };

  useEffect(() => {
    const keyPressHandler = (event) => {
      if ((event.key === "r" || event.key === "f") && isBoxSelected) {
        // wait for rotated/flipped piece to be updated
        setTimeout(function () {
          setPiece(pieces[pieceIndex]);
          fillPiece();
        }, 10);
      }
    };
    window.addEventListener("keydown", keyPressHandler);

    // remove the event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [isBoxSelected]);

  useEffect(() => {
    setPiece(pieces[pieceIndex]);
  }, [myPlayer]);

  // fills board state on updates
  useEffect(() => {
    fillPiece();
  }, [piece]);

  return (
    <>
      {hasPieceBeenPlayed == false && (
        <div
          className={`pieceBox ${isBoxSelected ? "clicked" : ""}`}
          onClick={handleClick}
        >
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
      )}
    </>
  );
}

export default PieceBox;
