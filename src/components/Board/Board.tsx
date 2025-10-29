import styles from "./Board.module.css";
import { useEffect } from "react";
import { useGame } from "../../context/GameContext";
import { Ball } from "../Ball/Ball";
import { Cell } from "../Cell/Cell";
import { validator } from "../../utils/validator";

export function Board() {
  const {
    board,
    handleCellClick,
    isWinningPosition,
    moves,
    setGameOver,
    setWinPositions,
  } = useGame();

  useEffect(() => {
    if (moves.length === 0) return;
    
    const result = validator(moves);
    const lastStep = result[`step_${moves.length}`];

    if (lastStep.board_state === "win" && lastStep.winner) {
      setGameOver(true);
      setWinPositions(lastStep.winner?.positions);
    } else if (lastStep.board_state === "draw") {
      setGameOver(true);
    }
  }, [moves, setGameOver, setWinPositions]);

  return (
    <div className={styles["board"]}>
      <div className={styles["board-inner"]}>
        {board.map((row, rowId) =>
          row.map((cell, colId) => (
            <Cell
              key={`${rowId}-${colId}`}
              onClick={() => handleCellClick(colId)}
            >
              {cell && (
                <Ball
                  player={cell}
                  isWinning={isWinningPosition(rowId, colId)}
                />
              )}
            </Cell>
          ))
        )}
      </div>
    </div>
  );
}
