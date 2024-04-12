import React, { createContext, useContext, useState } from 'react';
import { board_matrix } from '../gameLogic/board.js';

const BoardMatrixContext = createContext();

export const BoardMatrixProvider = ({ children }) => {
  const [boardMatrix, setBoardMatrix] = useState(board_matrix);

  return (
    <BoardMatrixContext.Provider value={{ boardMatrix, setBoardMatrix }}>
      {children}
    </BoardMatrixContext.Provider>
  );
};

export const useBoardMatrix = () => useContext(BoardMatrixContext);