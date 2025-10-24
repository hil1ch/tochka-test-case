import styles from "./Board.module.css";
import { useState } from "react";
import { BOARD_SETTINGS } from "../../constants/board-settings";
import { Ball } from "../Ball/Ball";
import type { Player } from "../../types/types";
import { Cell } from "../Cell/Cell";

export function Board() {
  const [board, setBoard] = useState<(Player | null)[][]>(
    Array(BOARD_SETTINGS.rows)
      .fill(null)
      .map(() => Array(BOARD_SETTINGS.columns).fill(null))
  );

  return (
    <div className={styles["board"]}>
      <div className={styles["board-inner"]}>
        {board.map((row, rowId) => (
            row.map((cell, colId) => (
                <Cell key={`${rowId}-${colId}`}>
                    {cell && <Ball />}
                </Cell>
            ))
        ))}
      </div>
    </div>
  );
}
