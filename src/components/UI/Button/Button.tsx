import styles from './Button.module.css';
import type { ReactNode } from 'react';

interface IButtonProps {
    children: ReactNode
}

export function Button({children}: IButtonProps) {
    return (
        <button className={styles['button']}>{children}</button>
    )
}