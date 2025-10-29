import { BOARD_SETTINGS } from "../constants/board-settings";
import type { IGameSteps, Player, Position } from "../types/types";
import { createStep } from "./createStep";
import { findTheLowestCell } from "./findTheLowestCell";

// Функция принимает массив чисел - последовательность шагов, возвращает объект с описанием хода игры по шагам
export function validator(moves: number[]): IGameSteps {
  const result: IGameSteps = {};

  // Формирование доски 7*6
  const board: (Player | null)[][] = Array(BOARD_SETTINGS.rows)
    .fill(null)
    .map(() => Array(BOARD_SETTINGS.columns).fill(null));
  const player1Positions: Position[] = [];
  const player2Positions: Position[] = [];

  // Игра еще не началась
  result.step_0 = createStep(player1Positions, player2Positions, "waiting");

  for (let i = 0; i < moves.length; i++) {
    const column = moves[i];

    //На четных индексах шаги первого игрока, на нечетных - второго
    const currentPlayer: Player = i % 2 === 0 ? "player_1" : "player_2";

    // Поиск самой нижней ячейки
    const row = findTheLowestCell(board, BOARD_SETTINGS.rows, column);

    if (row === -1) {
      continue;
    }

    // Заполнение ячеек
    board[row][column] = currentPlayer;
    const position: Position = [row, column];

    if (currentPlayer === "player_1") {
      player1Positions.push(position);
    } else {
      player2Positions.push(position);
    }

    // Проверка на победу
    const winPositions = findWinPositions(board, row, column, currentPlayer);
    if (winPositions) {
      result[`step_${i + 1}`] = createStep(
        player1Positions,
        player2Positions,
        "win",
        { who: currentPlayer, positions: winPositions }
      );
      return result;
    }

    // Проверка на ничью
    const isDraw = board.every((row) => row.every((cell) => cell !== null));
    if (isDraw) {
      result[`step_${i + 1}`] = createStep(
        player1Positions,
        player2Positions,
        "draw"
      );
      return result;
    }

    // Игра в процессе
    result[`step_${i + 1}`] = createStep(
      player1Positions,
      player2Positions,
      "pending"
    );
  }
  return result;
}

function findWinPositions(
  board: (Player | null)[][],
  row: number,
  column: number,
  player: Player
) {
  // Направления ходов
  const directions = [
    { dr: 0, dc: 1 },
    { dr: 1, dc: 0 },
    { dr: 1, dc: 1 },
    { dr: 1, dc: -1 },
  ];

  for (const { dr, dc } of directions) {
    const positions: Position[] = [[row, column]];

    // Проверяем фишки в прямом направлении (от текущей позиции)
    let r = row + dr;
    let c = column + dc;
    while (
      r >= 0 &&
      r < BOARD_SETTINGS.rows &&
      c >= 0 &&
      c < BOARD_SETTINGS.columns &&
      board[r][c] === player
    ) {
      positions.push([r, c]);
      r += dr;
      c += dc;
    }

    // Проверяем фишки в обратном направлении (от текущей позиции)
    r = row - dr;
    c = column - dc;
    while (
      r >= 0 &&
      r < BOARD_SETTINGS.rows &&
      c >= 0 &&
      c < BOARD_SETTINGS.columns &&
      board[r][c] === player
    ) {
      positions.push([r, c]);
      r -= dr;
      c -= dc;
    }

    if (positions.length >= 4) {
      return positions.slice(0, 4);
    }
  }

  return null;
}
