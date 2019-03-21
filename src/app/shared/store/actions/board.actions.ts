import { Action } from '@ngrx/store';

import { IBoard } from '../../models/boards';

export enum EBoardActions {
      Failure = '[Board] Failure',
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
      UpdateBoardsStarredInternal = '[Board] Update Boards Starred Internal'
      
}

//#region Failure

export class Failure implements Action {
      readonly type = EBoardActions.Failure;
      constructor(public payload: string) {}
}

//#endregion

//#region Get Boards

export class GetBoards implements Action{
      public readonly type = EBoardActions.GetBoards;
}

export class GetBoardsSuccess implements Action{
      public readonly type = EBoardActions.GetBoardsSuccess;
      constructor(public payload: IBoard[]){}
}

//#endregion

//#region Get Board

export class GetBoard implements Action{
      public readonly type = EBoardActions.GetBoard;
      constructor(public payload: number) {}
}

export class GetBoardSuccess implements Action{
      public readonly type = EBoardActions.GetBoardSuccess;
      constructor(public payload: IBoard){}
}

//#endregion

//#region Add Board

export class AddBoard implements Action{
      public readonly type = EBoardActions.AddBoard;
      constructor(public payload: any) {}
}

export class AddBoardSuccess implements Action{
      public readonly type = EBoardActions.AddBoardSuccess;
      constructor(public payload: IBoard){}
}

//#endregion

//#region Update Board

export class UpdateBoard implements Action{
      public readonly type = EBoardActions.UpdateBoard;
      constructor(public payload: {id: number, name?: string}) {}
}

export class UpdateBoardSuccess implements Action{
      public readonly type = EBoardActions.UpdateBoardSuccess;
      constructor(public payload: IBoard){}
}

//#endregion

//#region Update Board Starred

export class UpdateBoardStarred implements Action{
      public readonly type = EBoardActions.UpdateBoardStarred;
      constructor(public payload: {id: number, starred: boolean}) {}
}

export class UpdateBoardStarredSuccess implements Action{
      public readonly type = EBoardActions.UpdateBoardStarredSuccess;
      constructor(public payload: IBoard){}
}

//#endregion

//#region Internal Functions

export class UpdateBoardsStarredInternal implements Action{
      public readonly type = EBoardActions.UpdateBoardsStarredInternal;
      constructor(public payload: IBoard[]){}
}

//#endregion

export type BoardActions = 
      | Failure 
      | GetBoards 
      | GetBoardsSuccess 
      | GetBoard 
      | GetBoardSuccess
      | AddBoard
      | AddBoardSuccess
      | UpdateBoard
      | UpdateBoardSuccess
      | UpdateBoardStarred
      | UpdateBoardStarredSuccess
      | UpdateBoardsStarredInternal
      ;