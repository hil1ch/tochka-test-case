import styles from './Button.module.css';
import type { ReactNode } from 'react';

interface IButtonProps {
    children: ReactNode,
    onClick?: () => void;
}

export function Button({children, onClick}: IButtonProps) {
    return (
        <button className={styles['button']} onClick={onClick}>{children}</button>
    )
}