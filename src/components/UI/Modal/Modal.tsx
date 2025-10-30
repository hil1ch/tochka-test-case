import styles from "./Modal.module.css";
import type { ReactNode } from "react";
import ReactDOM from "react-dom";
import { Button } from "../Button/Button";

interface ModalAction {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
}

interface IModalProps {
  children: ReactNode;
  actions: ModalAction[]
}

const modalRoot = document.getElementById("modals");

export function Modal({ children, actions }: IModalProps) {
  return ReactDOM.createPortal(
    <div className={styles["modal"]}>
      <div className={styles["modal-overlay"]}></div>
      <div className={styles["modal-content"]}>
        <div className={styles["modal-inner"]}>
          <div className={styles["children"]}>{children}</div>
          <div className={styles['actions']}>
            {actions.map((action, index) => (
              <Button 
                key={index}
                onClick={action.onClick} 
                
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    modalRoot!
  );
}
