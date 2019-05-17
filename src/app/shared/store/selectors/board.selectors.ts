import { createSelector, MemoizedSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { boardAdapter, IBoardState, cardListAdapter, ICardListState, cardItemAdapter, ICardItemState } from '../state/board.state';
import { IBoard, ICardList, ICardItem } from '../../models/boards';

//#region Board

//#region Members

const selectBoardState = (state: IAppState) => state.boards.boards;

const entityAdapter = boardAdapter.getSelectors();

const selectAllBoardEntities = entityAdapter.selectEntities;
const selectAllBoardItems = entityAdapter.selectAll;
const selectAllBoardIds = entityAdapter.selectIds;

//#endregion

//#region State Selectors

export const selectSelectedBoardId: MemoizedSelector<IAppState, any> = createSelector(
      selectBoardState,
      (state: IBoardState ): any => state.selectedBoardId
);

export const selectBoardError: MemoizedSelector<IAppState, any> = createSelector(
      selectBoardState,
      (state: IBoardState ): any => state.error
);

export const selectBoardIsLoading: MemoizedSelector<IAppState, any> = createSelector(
      selectBoardState,
      (state: IBoardState ): any => state.isLoading
);

//#endregion

//#region Entity Selectors

const entityAllBoardsItems = createSelector(
      selectBoardState,
      selectAllBoardItems,
);

const entityAllBoardsEntities = createSelector(
      selectBoardState,
      selectAllBoardEntities
);

//#endregion

//#region Exported Selectors

export const selectAllBoardsItems = createSelector(
      entityAllBoardsItems,
      (allBoards: IBoard[]) => allBoards.sort((obj1, obj2) => {
            if (obj1.modifiedAt < obj2.modifiedAt) {
                  return 1;
            }
            if (obj1.modifiedAt > obj2.modifiedAt) {
                  return -1;
            }
            return 0;
      })
);

export const selectBoardsById = (id: number) => createSelector(
      entityAllBoardsItems,
      (allBoards: IBoard[]) => {
      if (allBoards) {
            return allBoards.find(board => board._id === id);
      } else {
            return null;
      }
});

export const selectCurrentBoard = createSelector(
      entityAllBoardsEntities,
      selectSelectedBoardId,
      (boardEntities, boardId) => boardEntities[boardId]
);

//#endregion

//#endregion

//#region Card List

//#region Members

const selectCardListState = (state: IAppState) => state.boards.cardlists;

const entityCardListAdapter = cardListAdapter.getSelectors();

const selectAllCardListEntities = entityCardListAdapter.selectEntities;
const selectAllCardListItems = entityCardListAdapter.selectAll;
const selectAllCardListIds = entityCardListAdapter.selectIds;

//#endregion

//#region State Selectors

export const selectSelectedCardListIds: MemoizedSelector<IAppState, any> = createSelector(
      selectCardListState,
      (state: ICardListState ): any => state.selectedCardListIds
);

export const selectCardListError: MemoizedSelector<IAppState, any> = createSelector(
      selectCardListState,
      (state: ICardListState ): any => state.error
);

export const selectCardListIsLoading: MemoizedSelector<IAppState, any> = createSelector(
      selectCardListState,
      (state: ICardListState ): any => state.isLoading
);

//#endregion

//#region Entity Selectors

const entityAllCardListItems = createSelector(
      selectCardListState,
      selectAllCardListItems,
);

const entityAllCardListEntities = createSelector(
      selectCardListState,
      selectAllCardListEntities
);

//#endregion

//#region Exported Selectors

export const selectAllCardListsItems = createSelector(
      entityAllCardListItems,
      (allCardLists: ICardList[]) => allCardLists.sort((obj1, obj2) => {
            if (obj1.modifiedAt > obj2.modifiedAt) {
                  return 1;
            }
            if (obj1.modifiedAt < obj2.modifiedAt) {
                  return -1;
            }
            return 0;
      })
);

export const selectSelectedCardLists = createSelector(
      entityAllCardListItems,
      selectSelectedCardListIds,
      (allCardLists: ICardList[], cardListIds: number[]) => allCardLists.filter(m => cardListIds.includes(m._id)).sort((obj1, obj2) => {
            if (obj1.position > obj2.position) {
                  return 1;
            }
            if (obj1.position < obj2.position) {
                  return -1;
            }
            return 0;
      })
);

//#endregion

//#endregion

//#region Card Item

//#region Members

const selectCardItemState = (state: IAppState) => state.boards.carditems;

const entityCardItemAdapter = cardItemAdapter.getSelectors();

const selectAllCardItemEntities = entityCardItemAdapter.selectEntities;
const selectAllCardItemItems = entityCardItemAdapter.selectAll;
const selectAllCardItemIds = entityCardItemAdapter.selectIds;

//#endregion

//#region State Selectors

export const selectSelectedCardItemIds: MemoizedSelector<IAppState, any> = createSelector(
      selectCardItemState,
      (state: ICardItemState ): any => state.selectedCardItemIds
);

export const selectCardItemError: MemoizedSelector<IAppState, any> = createSelector(
      selectCardItemState,
      (state: ICardItemState ): any => state.error
);

export const selectCardItemIsLoading: MemoizedSelector<IAppState, any> = createSelector(
      selectCardItemState,
      (state: ICardItemState ): any => state.isLoading
);

//#endregion

//#region Entity Selectors

const entityAllCardItemItems = createSelector(
      selectCardItemState,
      selectAllCardItemItems,
);

const entityAllCardItemEntities = createSelector(
      selectCardItemState,
      selectAllCardItemEntities
);

//#endregion

//#region Exported Selectors

export const selectAllCardItemsItems = createSelector(
      entityAllCardItemItems,
      (allCardItems: ICardItem[]) => allCardItems.sort((obj1, obj2) => {
            if (obj1.position > obj2.position) {
                  return 1;
            }
            if (obj1.position < obj2.position) {
                  return -1;
            }
            return 0;
      })
);

export const selectSelectedCardItems = createSelector(
      entityAllCardItemItems,
      selectSelectedCardItemIds,
      (allCardItems: ICardItem[], cardItemIds: number[]) => allCardItems.filter(m => cardItemIds.includes(m._id)).sort((obj1, obj2) => {
            if (obj1.position > obj2.position) {
                  return 1;
            }
            if (obj1.position < obj2.position) {
                  return -1;
            }
            return 0;
      })
);


//#endregion

//#endregion
