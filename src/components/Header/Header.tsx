import styles from "./Header.module.css";
import cn from "classnames";
import { Button } from "../UI/Button/Button";
import { RiResetLeftFill } from "react-icons/ri";

export function Header() {
  return (
    <div className={styles["header"]}>
      <h2 className={styles['heading']}>Игра "4 в ряд"</h2>
      <span className={styles['step-by']}>Ход игрока:</span>
      <div className={styles["players"]}>
        <div className={styles['player']}>
          <div className={styles["mark"]}></div>
          <span>Игрок 1</span>
        </div>
        <span className={styles['timer']}>0:15</span>
        <div className={cn(styles['player'], styles['active'])}>
          <div className={styles["mark"]}></div>
          <span>Игрок 2</span>
        </div>
      </div>
      <Button><RiResetLeftFill />Новая игра</Button>
    </div>
  );
}
