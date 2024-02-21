import React, { useState, useEffect, useRef } from "react";
import BoardBlock from "./BoardBlock";
import "./Board.css";
import { board_matrix, can_play_piece, play_piece } from "../gameLogic/board";
import { flip_piece, pieces } from "../gameLogic/pieceData";
import { rotate_piece } from "../gameLogic/pieceData";

function Board({ pieceIndex, myPlayer, endRound }) {
  const [board, setBoard] = useState(board_matrix);
  const [displayRows, setDisplayRows] = useState([]);
  const [hoverRow, setHoverRow] = useState(-1);
  const [hoverCol, setHoverCol] = useState(-1);
  const hoverRowRef = useRef(hoverRow);
  const hoverColRef = useRef(hoverCol);

  useEffect(() => {
    hoverRowRef.current = hoverRow;
    hoverColRef.current = hoverCol;
  }, [hoverRow, hoverCol]);

  // creates a 20x20 grid of block components based on board 2d matrix
  const fillBoard = () => {
    let boardComponents = board.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((cell, colIndex) => (
          // row and column indexes are inverted because rendering is flipped
          <BoardBlock
            onClick={() => placePlayerPiece(colIndex, rowIndex)}
            onHover={() => checkIfPiecePlayable(colIndex, rowIndex)}
            onMouseLeave={() => removeHighlightsFromBoard()}
            player={
              board[colIndex][rowIndex] !== ""
                ? board[colIndex][rowIndex]
                : null
            }
            myPlayer={myPlayer}
            highlight={board[colIndex][rowIndex] == "highlight"}
          />
        ))}
      </div>
    ));
    setDisplayRows(boardComponents);
  };

  const placePlayerPiece = (row, col) => {
    if (board[row][col] == "highlight" || board[row][col] == "pointer") {
      play_piece(row, col, myPlayer, pieceIndex);
      setBoard(board_matrix);
      setHoverRow(-1);
      setHoverCol(-1);
      endRound();
    }
  };

  const setBoardHighlights = (row, col) => {
    removeHighlightsFromBoard();
    const piece = pieces[pieceIndex];
    if (row + piece.length - 1 < board.length && col + piece[0].length - 1 < board[0].length){
      setBoard((prevBoard) => {
        const updatedBoard = [...prevBoard];
        for (let pieceR = 0; pieceR < piece.length; pieceR++) {
          for (let pieceC = 0; pieceC < piece[pieceR].length; pieceC++) {
            if (piece[pieceR][pieceC] === 1) {
              updatedBoard[row + pieceR][col + pieceC] = "highlight";
            } else {
              updatedBoard[row + pieceR][col + pieceC] = "pointer";
            }
          }
        }
        return updatedBoard;
      });
    }
  }

  const removeHighlightsFromBoard = () => {
    const updatedBoard = board.map((row) =>
      row.map((cell) => ((cell === "highlight" || cell === "pointer") ? "" : cell))
    );
    setBoard(updatedBoard);
  };

  const checkIfPiecePlayable = (row, col) => {
    // check if user selected a piece
    if (pieceIndex != -1){
      const showHighlight = can_play_piece(row, col, pieceIndex, myPlayer);
      if (showHighlight) {
        setHoverRow(row);
        setHoverCol(col);
        setBoardHighlights(row, col);
      }
    }
  };

  useEffect(() => {
    const keyPressHandler = (event) => {
      if (event.key === 'r' && pieceIndex != -1) {
        rotate_piece(pieceIndex);
        if (checkIfPiecePlayable(hoverRowRef.current, hoverColRef.current )){
          setBoardHighlights(hoverRowRef.current, hoverColRef.current)
        }
        else {
          removeHighlightsFromBoard();
        }
      } else if (event.key === 'f' && pieceIndex != -1) {
        flip_piece(pieceIndex);
        if (checkIfPiecePlayable(hoverRowRef.current, hoverColRef.current )){
          setBoardHighlights(hoverRowRef.current, hoverColRef.current)
        }
        else {
          removeHighlightsFromBoard();
        }
      }
    };
    window.addEventListener('keydown', keyPressHandler);
  }, [pieceIndex]);

  // fills board state on updates
  useEffect(() => {
    fillBoard();
  }, [board]);

  return (
    <div id="board">
      {displayRows}
    </div>
  );
}

export default Board;
