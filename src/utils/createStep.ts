import type {
  BoardState,
  IGameProccess,
  IWinner,
  Position,
} from "../types/types";

export function createStep(
  player1: Position[],
  player2: Position[],
  state: BoardState,
  winner?: IWinner
) {
  const step: IGameProccess = {
    player_1: [...player1],
    player_2: [...player2],
    board_state: state,
  };
  if (winner) {
    step.winner = winner;
  }

  return step;
}
