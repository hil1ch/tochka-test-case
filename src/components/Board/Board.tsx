import styles from "./Board.module.css";
import { useEffect } from "react";
import { useGame } from "../../context/GameContext";
import { Ball } from "../Ball/Ball";
import { Cell } from "../Cell/Cell";
import { validator } from "../../utils/validator";
import { Modal } from "../UI/Modal/Modal";

export function Board() {
  const {
    board,
    handleCellClick,
    isWinningPosition,
    moves,
    setGameOver,
    setWinPositions,
    winModal,
    drawModal,
    setWinModal,
    setDrawModal,
    resetGame,
    getWinnerName,
    setWinner,
    winner,
  } = useGame();

  useEffect(() => {
    if (moves.length === 0) return;

    const result = validator(moves);
    const lastStep = result[`step_${moves.length}`];

    if (lastStep.board_state === "win" && lastStep.winner) {
      setGameOver(true);
      setWinPositions(lastStep.winner?.positions);
      setWinner(lastStep.winner.who);
      setWinModal(true);
    } else if (lastStep.board_state === "draw") {
      setGameOver(true);
      setDrawModal(true);
    }
  }, [
    moves,
    setDrawModal,
    setGameOver,
    setWinModal,
    setWinPositions,
    setWinner,
  ]);

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
      {winModal && (
        <Modal onClick={resetGame}>
          <h2>🎉 Победа! 🎉</h2>
          {`${getWinnerName(winner)} выиграл!`}
        </Modal>
      )}
      {drawModal && (
        <Modal onClick={resetGame}>
          <h2>🤝 Ничья! 🤝</h2>
          <p>Все клетки заполнены, но победителя нет.</p>
          <p>Попробуйте сыграть еще раз!</p>
        </Modal>
      )}
    </div>
  );
}
