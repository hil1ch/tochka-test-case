import type { ReactNode } from 'react';
import styles from './Cell.module.css';
import cn from 'classnames';

interface ICellProps {
    children: ReactNode
}

export function Cell({children}: ICellProps) {
    return (
        <div className={cn(styles['cell'], styles['active'])}>
            {children}
        </div>
    )
}