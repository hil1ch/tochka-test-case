import styles from "./Modal.module.css";
import type { ReactNode } from "react";
import ReactDOM from "react-dom";
import { Button } from "../Button/Button";
import { RiResetLeftFill } from "react-icons/ri";

interface IModalProps {
  children: ReactNode;
}

const modalRoot = document.getElementById("modals");

export function Modal({ children }: IModalProps) {
  return ReactDOM.createPortal(
    <div className={styles['modal']}>
      <div className={styles["modal-overlay"]}></div>
      <div className={styles["modal-content"]}>
        <div className={styles["modal-inner"]}>
          <div className={styles['children']}>{children}</div>
          <Button>
            <RiResetLeftFill />
            Новая игра
          </Button>
        </div>
      </div>
    </div>,
    modalRoot!
  );
}
