import type { ReactNode } from 'react';
import styles from './Board.module.css';

interface IBoardProps {
    children: ReactNode
}

export function Board({children}: IBoardProps) {
    return (
        <div className={styles['board']}>
            {children}
        </div>
    )
}