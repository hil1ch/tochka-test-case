import styles from './Info.module.css';

const rules = [
    'Два игрока по очереди делают ходы',
    'Фишка падает в самую нижнюю свободную ячейку выбранной колонки',
    'Побеждает тот, кто первым собрал 4 фишки подряд по горизонтали, вертикали или диагонали'
]

export function Info() {
    return (
        <div className={styles['info']}>
            <h4 className={styles['info-heading']}>Правила игры:</h4>
            <ul className={styles['rules-list']}>
                {rules.map((rule) => (
                    <li key={rule} className={styles['rules-item']}>{rule}</li>
                ))}
            </ul>
        </div>
    )
}