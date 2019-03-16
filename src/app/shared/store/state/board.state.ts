import { IBoard } from '../../models/boards';

export interface IBoardState{
      boards: IBoard[];
      selectedBoard: IBoard;
}

export const initialBoardState: IBoardState = {
      boards: null,
      selectedBoard: null
}