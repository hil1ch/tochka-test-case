import type { Player } from "../types/types";

export function findTheLowestCell(
  board: (Player | null)[][],
  rows: number,
  column: number
) {
  let row = -1;
  for (let r = rows - 1; r >= 0; r--) {
    if (board[r][column] === null) {
      row = r;
      break;
    }
  }
  return row;
}
