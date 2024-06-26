import React, { useState, useEffect, useRef } from "react";
import BoardBlock from "./BoardBlock";
import "./Board.css";
import {
  board_matrix,
  play_piece,
  play_random_piece,
  set_board_matrix,
} from "../gameLogic/board";
import { can_play_piece } from "../gameLogic/checks";
import { flip_piece, pieces, reset_pieces } from "../gameLogic/pieceData";
import { rotate_piece } from "../gameLogic/pieceData";
import { useTimer } from "react-timer-hook";
import { bot_play_piece } from "../gameLogic/bot";
import {
  bots_playing,
  currentPlayerTurnIndex,
  set_turn_index,
} from "../gameLogic/playerData";
import {
  in_online_game,
  lobby_code,
  piece_played,
  player_id,
  player_name,
  socket,
  start_game,
} from "../gameLogic/lobbies";

function Board({
  playerNames,
  pieceIndex,
  myPlayer,
  expiryTimestamp,
  endRound,
  onlineGame,
  endGame,
}) {
  const [board, setBoard] = useState([[]]);
  const [displayRows, setDisplayRows] = useState([]);
  const [hoverRow, setHoverRow] = useState(-1);
  const [hoverCol, setHoverCol] = useState(-1);
  const hoverRowRef = useRef(hoverRow);
  const hoverColRef = useRef(hoverCol);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);

  // updated access to hover row and col
  useEffect(() => {
    hoverRowRef.current = hoverRow;
    hoverColRef.current = hoverCol;
  }, [hoverRow, hoverCol]);

  // timer values
  const timerLength = 59;
  const [timerFlipState, setTimerFlipState] = useState(true);
  const {
    seconds,

    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => setTimerFlipState(!timerFlipState),
  });

  const startGame = () => {
    var playersChosen = playerNames != ['c1', 'c2', 'c3', 'c4']
    if (playersChosen) {
      if (onlineGame) {
        // sends information to socket
        start_game(lobby_code);
      }
      setGameStarted(true);
      resume();
    }
  };

  // tracks if game was started by another user
  socket.on("game_started", (data) => {
    if (onlineGame && lobby_code === data["lobbyCode"]) {
      setGameStarted(true);
      resume();
    }
  });

  // creates a 20x20 grid of block components based on board 2d matrix
  const fillBoard = () => {
    let boardComponents = board.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((cell, colIndex) => (
          // row and column indexes are inverted because rendering is flipped
          <BoardBlock
            key={rowIndex + " " + colIndex}
            onClick={() => placePlayerPiece(colIndex, rowIndex)}
            onHover={() => checkIfPiecePlayable(colIndex, rowIndex)}
            onMouseLeave={() => removeHighlightsFromBoard()}
            player={
              board[colIndex][rowIndex] !== ""
                ? board[colIndex][rowIndex]
                : null
            }
            myPlayer={myPlayer}
            highlight={board[colIndex][rowIndex] === "highlight"}
          />
        ))}
      </div>
    ));
    setDisplayRows(boardComponents);
  };

  // tracks if another user played a piece
  socket.on("piece_played", (data) => {
    if (
      onlineGame &&
      lobby_code === data["lobbyCode"] &&
      player_id !== data["playerId"]
    ) {
      let turn = data["turn"];
      set_turn_index(turn);
      reset_pieces();
      let socketBoard = data["board"];
      setBoard(socketBoard);
      fillBoard();
      // reset hover indeces
      setHoverRow(-1);
      setHoverCol(-1);
      // reset time
      const time = new Date();
      time.setSeconds(time.getSeconds() + timerLength);
      restart(time);

      //if (JSON.stringify(socketBoard) === JSON.stringify(board_matrix))
      //  end_turn();
      set_board_matrix(socketBoard);

      // end round
      endRound();
    }
  });

  const placePlayerPiece = (row, col) => {
    if (
      !gamePaused &&
      (board[row][col] === "highlight" || board[row][col] === "pointer")
    ) {
      let play = play_piece(playerNames, row, col, myPlayer, pieceIndex);
      if (onlineGame) {
        // sends information to socket
        piece_played(lobby_code, board_matrix);
      } else if (Array.isArray(play)) {
        pause();
        setGameStarted(false);
        endGame(play);
      }
      setBoard(board_matrix);
      // reset hover indeces
      setHoverRow(-1);
      setHoverCol(-1);
      // reset time
      const time = new Date();
      time.setSeconds(time.getSeconds() + timerLength);
      restart(time);
      // end round
      endRound();
    }
  };

  const playBotRound = (difficulty) => {
    let play = bot_play_piece(playerNames, myPlayer, difficulty);
    if (onlineGame) {
      // sends information to socket
      piece_played(lobby_code, board_matrix, true);
    } else if (Array.isArray(play)) {
      pause();
      setGameStarted(false);
      endGame(play);
    }
    setBoard(board_matrix);
    fillBoard();
    endRound();
  };

  const setBoardHighlights = (row, col) => {
    if (gameStarted) {
      removeHighlightsFromBoard();
      const piece = pieces[pieceIndex];
      if (
        row + piece.length - 1 < board.length &&
        col + piece[0].length - 1 < board[0].length
      ) {
        setBoard((prevBoard) => {
          const updatedBoard = [...prevBoard];
          for (let pieceR = 0; pieceR < piece.length; pieceR++) {
            for (let pieceC = 0; pieceC < piece[pieceR].length; pieceC++) {
              if (piece[pieceR][pieceC] === 1) {
                updatedBoard[row + pieceR][col + pieceC] = "highlight";
              } else if (updatedBoard[row + pieceR][col + pieceC] === "") {
                updatedBoard[row + pieceR][col + pieceC] = "pointer";
              }
            }
          }
          return updatedBoard;
        });
      }
    }
  };

  const removeHighlightsFromBoard = () => {
    const updatedBoard = board.map((row) =>
      row.map((cell) =>
        cell === "highlight" || cell === "pointer" ? "" : cell
      )
    );
    setBoard(updatedBoard);
  };

  const checkIfPiecePlayable = (row, col) => {
    // check if it's your turn
    if (
      !in_online_game ||
      (in_online_game && playerNames[currentPlayerTurnIndex] === player_name)
    ) {
      // check if user selected a piece
      if (pieceIndex !== -1) {
        let piece = pieces[pieceIndex];
        const showHighlight = can_play_piece(
          board_matrix,
          piece,
          row,
          col,
          myPlayer
        );
        if (showHighlight) {
          setHoverRow(row);
          setHoverCol(col);
          setBoardHighlights(row, col);
        }
      }
    }
  };

  // STRETCH GOAL: pause game
  const toggleGamePaused = () => {
    setGamePaused((prevPaused) => !prevPaused);
  };

  // handles pausing of local game
  useEffect(() => {
    if (gamePaused) {
      pause();
    } else {
      resume();
    }
  }, [gamePaused]);

  // handles resetting of timer
  useEffect(() => {
    if (seconds === 0) {
      let play = play_random_piece(playerNames, myPlayer);
      if (onlineGame) {
        // sends information to socket
        piece_played(lobby_code, board_matrix);
      } else if (Array.isArray(play)) {
        pause();
        setGameStarted(false);
        endGame(play);
      }
      // delay to render piece
      setTimeout(function () {
        setBoard(board_matrix);
        fillBoard();
        setHoverRow(-1);
        setHoverCol(-1);
        endRound();
        const time = new Date();
        time.setSeconds(time.getSeconds() + timerLength);
        restart(time);
      }, 10);
    }
  }, [timerFlipState]);

  // handles rotate and flip key presses
  useEffect(() => {
    const keyPressHandler = (event) => {
      if (event.key === "r" && pieceIndex !== -1) {
        rotate_piece(pieceIndex);
        if (checkIfPiecePlayable(hoverRowRef.current, hoverColRef.current)) {
          setBoardHighlights(hoverRowRef.current, hoverColRef.current);
        } else {
          removeHighlightsFromBoard();
        }
      } else if (event.key === "f" && pieceIndex !== -1) {
        flip_piece(pieceIndex);
        if (checkIfPiecePlayable(hoverRowRef.current, hoverColRef.current)) {
          setBoardHighlights(hoverRowRef.current, hoverColRef.current);
        } else {
          removeHighlightsFromBoard();
        }
      }
    };
    window.addEventListener("keydown", keyPressHandler);

    // remove the event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [pieceIndex]);

  useEffect(() => {
    if (onlineGame) {
      var player = playerNames[currentPlayerTurnIndex];
      if (typeof player === "string" && player.includes("bot")) {
        playBotRound(player.split(" ")[0]);
      }
    } else {
      var bot = bots_playing[currentPlayerTurnIndex];
      if (bot !== "") {
        playBotRound(bot);
      }
    }
  }, [myPlayer]);

  // fills board state on updates
  useEffect(() => {
    fillBoard();
  }, [board]);

  // sets the board to board matrix at start of game
  useEffect(() => {
    setBoard(board_matrix);
    pause();
  }, []);

  return (
    <>
      {gameStarted && !onlineGame && (
        <div id="pauseContainer" onClick={toggleGamePaused}>
          {gamePaused ? (
            <React.Fragment>
              <div id="resume"></div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="pauseLine"></div>
              <div className="pauseLine"></div>
            </React.Fragment>
          )}
        </div>
      )}

      {gamePaused && (
        <div id="pausedTxtHolder">
          <div id="pausedTxt">Game Paused</div>
        </div>
      )}

      {onlineGame && (
        <div id="lobbyHolder">
          <div id="lobbyTxt">Lobby: {lobby_code}</div>
        </div>
      )}

      <div id="board">{displayRows}</div>

      <div id="timerHolder">
        {gameStarted ? (
          <div id="playerTimer" className={seconds <= 10 ? "redBorder" : ""}>
            {seconds}
          </div>
        ) : (
          <div id="startBtn" onClick={() => startGame()}>
            Start Game
          </div>
        )}
      </div>
    </>
  );
}

export default Board;
