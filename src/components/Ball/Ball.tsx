import type { Player } from "../../types/types";
import styles from "./Ball.module.css";
import cn from "classnames";

interface IBallProps {
  className?: string;
  player: Player;
  isWinning: boolean;
}

export function Ball({ className, player, isWinning = false }: IBallProps) {
  return (
    <div
      className={cn(className, styles["ball"], styles[player], {
        [styles["winning"]]: isWinning,
      })}
    ></div>
  );
}
