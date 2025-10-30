export type Player = 'player_1' | 'player_2';
export type Position = [number, number];
export type BoardState = 'waiting' | 'pending' | 'win' | 'draw';

// Информация о победителе
export interface IWinner {
    who: Player;
    positions: Position[];
}

// Выходные данные в виде объекта с подробным описанием хода игры по шагам
export interface IGameProccess {
    player_1: Position[];
    player_2: Position[];
    board_state: BoardState;
    winner?: IWinner;
}

export interface IGameSteps {
    [key: `step_${number}`]: IGameProccess
}

export interface IScore {
    player1: number;
    player2: number;
    draws: number;
}