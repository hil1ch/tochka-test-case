import { createContext, useState, useContext, type ReactNode } from "react";
import type { Position, Player } from "../types/types";
import { BOARD_SETTINGS } from "../constants/board-settings";
import { findTheLowestCell } from "../utils/findTheLowestCell";

interface IGameContext {
  board: (Player | null)[][];
  moves: number[];
  currentPlayer: Player;
  gameOver: boolean;
  winPositions: Position[];
  isWinningPosition: (row: number, column: number) => boolean;
  resetGame: () => void;
  handleCellClick: (column: number) => void;
  setGameOver: (gameOver: boolean) => void;
  setWinPositions: (winPositions: Position[]) => void;
}

const GameContext = createContext<IGameContext | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [board, setBoard] = useState<(Player | null)[][]>(
    Array(BOARD_SETTINGS.rows)
      .fill(null)
      .map(() => Array(BOARD_SETTINGS.columns).fill(null))
  );
  const [moves, setMoves] = useState<number[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("player_1");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winPositions, setWinPositions] = useState<Position[]>([]);

  // Сброс игры
  const resetGame = () => {
    setMoves([]);
    setBoard(
      Array(BOARD_SETTINGS.rows)
        .fill(null)
        .map(() => Array(BOARD_SETTINGS.columns).fill(null))
    );
    setCurrentPlayer("player_1");
    setGameOver(false);
    setWinPositions([]);
  };

  // Клик по ячейке
  const handleCellClick = (column: number) => {
    if (gameOver) return;

    const row = findTheLowestCell(
      board,
      BOARD_SETTINGS.rows,
      column
    );

    const updatedBoard = board.map((r) => [...r]);
    updatedBoard[row][column] = currentPlayer;
    setBoard(updatedBoard);

    setMoves([...moves, column]);
    setCurrentPlayer(currentPlayer === "player_1" ? "player_2" : "player_1");
  };

  // Проверка на выигрышную позицию
  const isWinningPosition = (row: number, column: number) => {
    return winPositions.some(([r, c]) => r === row && c === column);
  };

  const value = {
    board,
    moves,
    currentPlayer,
    gameOver,
    winPositions,
    resetGame,
    handleCellClick,
    isWinningPosition,
    setGameOver,
    setWinPositions
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
