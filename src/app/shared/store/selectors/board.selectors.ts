import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IBoardState } from '../state/board.state';

const selectBoards = (state: IAppState) => state.boards;

export const selectBoardList = createSelector(
      selectBoards,
      (state: IBoardState) => state.boards
)

export const selectSelectedBoard = createSelector(
      selectBoards,
      (state: IBoardState) => state.selectedBoard
)