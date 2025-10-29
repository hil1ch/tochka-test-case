import styles from "./Modal.module.css";
import type { ReactNode } from "react";;
import ReactDOM from "react-dom";
import { Button } from "../Button/Button";
import { RiResetLeftFill } from "react-icons/ri";

interface IModalProps {
  children: ReactNode;
  onClick: () => void;
}

const modalRoot = document.getElementById("modals");

export function Modal({ children, onClick }: IModalProps) {
  return ReactDOM.createPortal(
    <div className={styles["modal"]}>
      <div className={styles["modal-overlay"]}></div>
      <div className={styles["modal-content"]}>
        <div className={styles["modal-inner"]}>
          <div className={styles["children"]}>{children}</div>
          <Button onClick={onClick}>
            <RiResetLeftFill />
            Новая игра
          </Button>
        </div>
      </div>
    </div>,
    modalRoot!
  );
}
