import { Action } from '@ngrx/store';

import { IBoard } from '../../models/boards';

export enum EBoardActions {
      GetBoards = '[Board] Get Boards',
      GetBoardsSuccess = '[Board] Get Boards Success',
      GetBoardsFailure = '[Board] Get Boards Failure',
      GetBoard = '[Board] Get Board',
      GetBoardSuccess = '[Board] Get Board Success',
      GetBoardFailure = '[Board] Get Board Failure',
      AddBoard = '[Board] Add Board',
      AddBoardSuccess = '[Board] Add Board Success',
      AddBoardFailure = '[Board] Add Board Failure'
}

//#region Get Boards

export class GetBoards implements Action{
      public readonly type = EBoardActions.GetBoards;
}

export class GetBoardsSuccess implements Action{
      public readonly type = EBoardActions.GetBoardsSuccess;
      constructor(public payload: IBoard[]){}
}

export class GetBoardsFailure implements Action {
      readonly type = EBoardActions.GetBoardsFailure;
      constructor(public payload: string) {}
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

export class GetBoardFailure implements Action {
      readonly type = EBoardActions.GetBoardFailure;
      constructor(public payload: string) {}
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

export class AddBoardFailure implements Action {
      readonly type = EBoardActions.AddBoardFailure;
      constructor(public payload: string) {}
}

//#endregion

export type BoardActions = 
      | GetBoards 
      | GetBoardsSuccess 
      | GetBoardsFailure
      | GetBoard 
      | GetBoardSuccess
      | GetBoardFailure
      | AddBoard
      | AddBoardSuccess
      | AddBoardFailure
      ;