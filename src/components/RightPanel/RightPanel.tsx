import styles from "./RightPanel.module.css";
import { Header } from "../Header/Header";
import { Info } from "../Info/Info";

export function RightPanel() {
  return (
    <div className={styles["right-panel"]}>
      <Header />
      <Info />
    </div>
  );
}
