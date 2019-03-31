import { Action } from '@ngrx/store';

import { IBoard, ICardList, ICardItem } from '../../models/boards';

export enum EBoardActions {
      Failure = '[Board] Failure',
      SaveBoardState = '[Board] Save State',

      GetBoards = '[Board] Get Boards',
      GetBoardsSuccess = '[Board] Get Boards Success',
      GetBoard = '[Board] Get Board',
      GetBoardSuccess = '[Board] Get Board Success',
      AddBoard = '[Board] Add Board',
      AddBoardSuccess = '[Board] Add Board Success',
      UpdateBoard = '[Board] Update Board',
      UpdateBoardSuccess = '[Board] Update Board Success',
      UpdateBoardStarred = '[Board] Update Board Starred',
      UpdateBoardStarredSuccess = '[Board] Update Board Starred Success',
      UpdateBoardsStarredInternal = '[Board] Update Boards Starred Internal',
      DeleteBoard = '[Board] Delete Board',
      DeleteBoardSuccess = '[Board] Delete Board Success',
      ArchiveBoard = '[Board] Archive Board',
      ArchiveBoardSuccess = '[Board] Archive Board Success',

      GetCardLists = '[Board] Get Card Lists',
      GetCardListsSuccess = '[Board] Get Card Lists Success',
      AddCardList = '[Board] Add Card List',
      AddCardListSuccess = '[Board] Add Card List Success',
      UpdateCardListPriority = '[Board] Update Card List Priority',
      UpdateCardListPrioritySuccess = '[Board] Update Card List Priority Success',
      MoveCardListItems = '[Board] Move Card List Items',
      MoveCardListItemsSuccess = '[Board] Move Card List Items Success',
      SortCardList = '[Board] Sort Card List',
      SortCardListSuccess = '[Board] Sort Card List Success',
      DeleteCardList = '[Board] Delete Card List',
      DeleteCardListSuccess = '[Board] Delete Card List Success',
      ArchiveCardList = '[Board] Archive Card List',
      ArchiveCardListSuccess = '[Board] Archive Card List Success',

      GetCardItems = '[Board] Get Card Items',
      GetCardItemsSuccess = '[Board] Get Card Items Success',
      AddCardItem = '[Board] Add Card Item',
      AddCardItemSuccess = '[Board] Add Card Item Success',
      UpdateCardItemPriority = '[Board] Update Card Item Priority',
      UpdateCardItemPrioritySuccess = '[Board] Update Card Item Priority Success',
      DeleteCardItem = '[Board] Delete Card Item',
      DeleteCardItemSuccess = '[Board] Delete Card Item Success',
      ArchiveCardItem = '[Board] Archive Card Item',
      ArchiveCardItemSuccess = '[Board] Archive Card Item Success',

}

//#region Failure

export class Failure implements Action {
      readonly type = EBoardActions.Failure;
      constructor(public payload: any) {}
}

export class SaveBoardState implements Action {
      readonly type = EBoardActions.SaveBoardState;
      constructor(public payload: {action: BoardActions}) {}
}

//#endregion

//#region Board

//#region Get Boards

export class GetBoards implements Action {
      public readonly type = EBoardActions.GetBoards;
}

export class GetBoardsSuccess implements Action {
      public readonly type = EBoardActions.GetBoardsSuccess;
      constructor(public payload: {boards: IBoard[]}) {}
}

//#endregion

//#region Get Board

export class GetBoard implements Action {
      public readonly type = EBoardActions.GetBoard;
      constructor(public payload: {id: number}) {}
}

export class GetBoardSuccess implements Action {
      public readonly type = EBoardActions.GetBoardSuccess;
      constructor(public payload: {board: IBoard}) {}
}

//#endregion

//#region Add Board

export class AddBoard implements Action {
      public readonly type = EBoardActions.AddBoard;
      constructor(public payload: {board: any}) {}
}

export class AddBoardSuccess implements Action {
      public readonly type = EBoardActions.AddBoardSuccess;
      constructor(public payload: {board: IBoard}) {}
}

//#endregion

//#region Update Board

export class UpdateBoard implements Action {
      public readonly type = EBoardActions.UpdateBoard;
      constructor(public payload: {id: number, name?: string}) {}
}

export class UpdateBoardSuccess implements Action {
      public readonly type = EBoardActions.UpdateBoardSuccess;
      constructor(public payload: {board: IBoard}) {}
}

//#endregion

//#region Update Board Starred

export class UpdateBoardStarred implements Action {
      public readonly type = EBoardActions.UpdateBoardStarred;
      constructor(public payload: {id: number, starred: boolean}) {}
}

export class UpdateBoardStarredSuccess implements Action {
      public readonly type = EBoardActions.UpdateBoardStarredSuccess;
      constructor(public payload: {board: IBoard}) {}
}

//#endregion

//#region Delete Board

export class DeleteBoard implements Action {
      public readonly type = EBoardActions.DeleteBoard;
      constructor(public payload: {id: number}) {}
}

export class DeleteBoardSuccess implements Action {
      public readonly type = EBoardActions.DeleteBoardSuccess;
      constructor(public payload: {id: number}) {}
}

//#endregion

//#region Archive Board

export class ArchiveBoard implements Action {
      public readonly type = EBoardActions.ArchiveBoard;
      constructor(public payload: {id: number}) {}
}

export class ArchiveBoardSuccess implements Action {
      public readonly type = EBoardActions.ArchiveBoardSuccess;
      constructor(public payload: {id: number}) {}
}

//#endregion

//#region Internal Functions

export class UpdateBoardsStarredInternal implements Action {
      public readonly type = EBoardActions.UpdateBoardsStarredInternal;
      constructor(public payload: {boards: IBoard[]}) {}
}

//#endregion

//#endregion

//#region Card List

export class GetCardLists implements Action {
      public readonly type = EBoardActions.GetCardLists;
      constructor(public payload: {id: number}) {}
}

export class GetCardListsSuccess implements Action {
      public readonly type = EBoardActions.GetCardListsSuccess;
      constructor(public payload: {cardLists: ICardList[]}) {}
}

export class AddCardList implements Action {
      public readonly type = EBoardActions.AddCardList;
      constructor(public payload: {id: number, name: string, priority: number}) {}
}

export class AddCardListSuccess implements Action {
      public readonly type = EBoardActions.AddCardListSuccess;
      constructor(public payload: {cardList: ICardList}) {}
}

export class UpdateCardListPriority implements Action {
      public readonly type = EBoardActions.UpdateCardListPriority;
      constructor(public payload: {cardLists: ICardList[]}) {}
}

export class UpdateCardListPrioritySuccess implements Action {
      public readonly type = EBoardActions.UpdateCardListPrioritySuccess;
      constructor(public payload: {id: number}) {}
}

export class MoveCardListItems implements Action {
      public readonly type = EBoardActions.MoveCardListItems;
      constructor(public payload: {id: number, destinationId: number}) {}
}

export class MoveCardListItemsSuccess implements Action {
      public readonly type = EBoardActions.MoveCardListItemsSuccess;
      constructor(public payload: {cardLists: ICardList[]}) {}
}

export class SortCardList implements Action {
      public readonly type = EBoardActions.SortCardList;
      constructor(public payload: {id: number, mode: number}) {}
}

export class SortCardListSuccess implements Action {
      public readonly type = EBoardActions.SortCardListSuccess;
      constructor(public payload: {cardItems: ICardItem[]}) {}
}

export class DeleteCardList implements Action {
      public readonly type = EBoardActions.DeleteCardList;
      constructor(public payload: {id: number}) {}
}

export class DeleteCardListSuccess implements Action {
      public readonly type = EBoardActions.DeleteCardListSuccess;
      constructor(public payload: {id: number}) {}
}

export class ArchiveCardList implements Action {
      public readonly type = EBoardActions.ArchiveCardList;
      constructor(public payload: {id: number}) {}
}

export class ArchiveCardListSuccess implements Action {
      public readonly type = EBoardActions.ArchiveCardListSuccess;
      constructor(public payload: {id: number}) {}
}

//#endregion

//#region  Card Item

export class GetCardItems implements Action {
      public readonly type = EBoardActions.GetCardItems;
      constructor(public payload: {id: number}) {}
}

export class GetCardItemsSuccess implements Action {
      public readonly type = EBoardActions.GetCardItemsSuccess;
      constructor(public payload: {cardItems: ICardItem[]}) {}
}

export class AddCardItem implements Action {
      public readonly type = EBoardActions.AddCardItem;
      constructor(public payload: {id: number, name: string, priority: number}) {}
}

export class AddCardItemSuccess implements Action {
      public readonly type = EBoardActions.AddCardItemSuccess;
      constructor(public payload: {cardItem: ICardItem}) {}
}

export class UpdateCardItemPriority implements Action {
      public readonly type = EBoardActions.UpdateCardItemPriority;
      constructor(public payload: {
            changedId?: number,
            from?: {id: number, carditems: ICardItem[]},
            to: {id: number, carditems: ICardItem[]}
      }) {}
}

export class UpdateCardItemPrioritySuccess implements Action {
      public readonly type = EBoardActions.UpdateCardItemPrioritySuccess;
      constructor(public payload: {id: number}) {}
}

export class DeleteCardItem implements Action {
      public readonly type = EBoardActions.DeleteCardItem;
      constructor(public payload: {id: number}) {}
}

export class DeleteCardItemSuccess implements Action {
      public readonly type = EBoardActions.DeleteCardItemSuccess;
      constructor(public payload: {id: number}) {}
}

export class ArchiveCardItem implements Action {
      public readonly type = EBoardActions.ArchiveCardItem;
      constructor(public payload: {id: number}) {}
}

export class ArchiveCardItemSuccess implements Action {
      public readonly type = EBoardActions.ArchiveCardItemSuccess;
      constructor(public payload: {id: number}) {}
}

//#endregion

export type BoardActions =
      | Failure                     | SaveBoardState

      | GetBoards                   | GetBoardsSuccess
      | GetBoard                    | GetBoardSuccess
      | AddBoard                    | AddBoardSuccess
      | UpdateBoard                 | UpdateBoardSuccess
      | UpdateBoardStarred          | UpdateBoardStarredSuccess
      | UpdateBoardsStarredInternal
      | DeleteBoard                 | DeleteBoardSuccess
      | ArchiveBoard                | ArchiveBoardSuccess

      | GetCardLists                | GetCardListsSuccess
      | AddCardList                 | AddCardListSuccess
      | UpdateCardListPriority      | UpdateCardListPrioritySuccess
      | MoveCardListItems           | MoveCardListItemsSuccess
      | SortCardList                | SortCardListSuccess
      | DeleteCardList              | DeleteCardListSuccess
      | ArchiveCardList             | ArchiveCardListSuccess

      | GetCardItems                | GetCardItemsSuccess
      | AddCardItem                 | AddCardItemSuccess
      | UpdateCardItemPriority      | UpdateCardItemPrioritySuccess
      | DeleteCardItem              | DeleteCardItemSuccess
      | ArchiveCardItem             | ArchiveCardItemSuccess
;
