interface IBoardSettings {
    rows: number;
    columns: number;
    win_combination: number;
}

export const BOARD_SETTINGS: IBoardSettings = {
    rows: 6,
    columns: 7,
    win_combination: 4
}