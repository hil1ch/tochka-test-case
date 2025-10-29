import styles from "./Header.module.css";
import cn from "classnames";
import { Button } from "../UI/Button/Button";
import { RiResetLeftFill } from "react-icons/ri";
import { useGame } from "../../context/GameContext";

export function Header() {
  const { currentPlayer, gameOver, resetGame } = useGame();

  return (
    <div className={styles["header"]}>
      <h2 className={styles["heading"]}>Игра "4 в ряд"</h2>
      <span className={styles["step-by"]}>Ход игрока:</span>
      <div className={styles["players"]}>
        <div
          className={cn(styles["player"], {
            [styles["player1_active"]]: currentPlayer === "player_1" && !gameOver,
          })}
        >
          <div className={styles["player1-mark"]}></div>
          <span>Игрок 1</span>
        </div>
        <div
          className={cn(styles["player"], {
            [styles["player2_active"]]: currentPlayer === "player_2" && !gameOver,
          })}
        >
          <div className={styles["player2-mark"]}></div>
          <span>Игрок 2</span>
        </div>
      </div>
      <Button onClick={resetGame}>
        <RiResetLeftFill />
        Новая игра
      </Button>
    </div>
  );
}
