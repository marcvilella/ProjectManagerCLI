import { createSelector, MemoizedSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { boardAdapter, IBoardState } from '../state/board.state';
import { IBoard } from '../../models/boards';

//#region Members

const selectBoardState = (state: IAppState) => state.boards;

const entityAdapter = boardAdapter.getSelectors();

const selectAllBoardEntities = entityAdapter.selectEntities;
const selectAllBoardItems = entityAdapter.selectAll;
const selectAllBoardIds = entityAdapter.selectIds;

//#endregion

//#region State Selectors

export const selectBoardError: MemoizedSelector<IAppState, any> = createSelector(
      selectBoardState,
      (state: IBoardState ): any => state.error
);

export const selectBoardIsLoading: MemoizedSelector<IAppState, boolean> = createSelector(
      selectBoardState, 
      (state: IBoardState): boolean => state.isLoading
);

//#endregion

//#region Entity Selectors

const entityAllBoardsItems = createSelector(
      selectBoardState,
      selectAllBoardItems,
)

const entityAllBoardsEntities = createSelector(
      selectBoardState,
      selectAllBoardEntities
)

export const selectAllBoardsItems = createSelector(
      entityAllBoardsItems, 
      (allBoards: IBoard[]) => allBoards.sort((obj1, obj2) => {
            if (obj1.modifiedAt < obj2.modifiedAt) 
                  return 1;
            if (obj1.modifiedAt > obj2.modifiedAt)
                  return -1;
            return 0;
      })
);

export const selectBoardsById = (id: number) => createSelector(
      entityAllBoardsItems, 
      (allBoards: IBoard[]) => {
      if (allBoards) {
            return allBoards.find(board => board._id == id);
      } else {
            return null;
      }
});

export const selectCurrentBoardId: MemoizedSelector<IAppState, number> = createSelector(
      selectBoardState,
      (state: IBoardState) => state.selectedBoardId
);

export const selectCurrentBoard = createSelector(
      entityAllBoardsEntities,
      selectCurrentBoardId,
      (boardEntities, boardId) => boardEntities[boardId]
);

//#endregion