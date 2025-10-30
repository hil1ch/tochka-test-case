import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
  useCallback,
} from "react";
import type { Position, Player, IScore } from "../types/types";
import { BOARD_SETTINGS } from "../constants/board-settings";
import { findTheLowestCell } from "../utils/findTheLowestCell";

interface IGameContext {
  board: (Player | null)[][];
  moves: number[];
  currentPlayer: Player;
  gameOver: boolean;
  winPositions: Position[];
  winModal: boolean;
  drawModal: boolean;
  winner: Player | null;
  score: IScore;
  isWinningPosition: (row: number, column: number) => boolean;
  resetGame: () => void;
  handleCellClick: (column: number) => void;
  setGameOver: (gameOver: boolean) => void;
  setWinPositions: (winPositions: Position[]) => void;
  getWinnerName: (winner: Player | null) => string;
  setWinModal: (value: boolean) => void;
  setDrawModal: (value: boolean) => void;
  setWinner: (winner: Player | null) => void;
  updateScore: (winner: Player | "draw") => void;
  continueGame: () => void;
}

const SCORE_STORAGE_KEY = "score";

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
  const [winModal, setWinModal] = useState<boolean>(false);
  const [drawModal, setDrawModal] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [score, setScore] = useState<IScore>(() => {
    try {
      const savedScore = localStorage.getItem(SCORE_STORAGE_KEY);
      if (savedScore) {
        return JSON.parse(savedScore);
      }
    } catch (error) {
      console.error("Error loading score from localStorage:", error);
    }
    return { player1: 0, player2: 0, draws: 0 };
  });

  // Сохранение счета в localStorage
  useEffect(() => {
    localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(score));
  }, [score]);


  // Обновление счета
  const updateScore = useCallback((winner: Player | "draw") => {
    setScore((prevScore) => {
      const newScore = { ...prevScore };
      if (winner === "player_1") {
        newScore.player1 += 1;
      } else if (winner === "player_2") {
        newScore.player2 += 1;
      } else if (winner === "draw") {
        newScore.draws += 1;
      }
      return newScore;
    });
  }, []);

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
    setWinModal(false);
    setDrawModal(false);
    setWinner(null);
    setScore({ player1: 0, player2: 0, draws: 0 })
  };

  // Продолжение игры с сохранением счета
  const continueGame = () => {
    setMoves([]);
    setBoard(
      Array(BOARD_SETTINGS.rows)
        .fill(null)
        .map(() => Array(BOARD_SETTINGS.columns).fill(null))
    );
    setCurrentPlayer("player_1");
    setGameOver(false);
    setWinPositions([]);
    setWinModal(false);
    setDrawModal(false);
    setWinner(null);
  }

  // Клик по ячейке
  const handleCellClick = (column: number) => {
    if (gameOver) return;

    const row = findTheLowestCell(board, BOARD_SETTINGS.rows, column);

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

  const getWinnerName = (winner: Player | null) => {
    return winner === "player_1" ? "Игрок 1" : "Игрок 2";
  };

  const value = {
    board,
    moves,
    currentPlayer,
    gameOver,
    winPositions,
    winModal,
    drawModal,
    winner,
    score,
    setWinner,
    resetGame,
    handleCellClick,
    isWinningPosition,
    setGameOver,
    setWinPositions,
    getWinnerName,
    setWinModal,
    setDrawModal,
    updateScore,
    continueGame
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
