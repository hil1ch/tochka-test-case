import type { ReactNode } from 'react';
import styles from './Cell.module.css';
import cn from 'classnames';

interface ICellProps {
    children: ReactNode
    onClick: () => void
}

export function Cell({children, onClick}: ICellProps) {
    return (
        <div className={cn(styles['cell'], styles['active'])} onClick={onClick}>
            {children}
        </div>
    )
}