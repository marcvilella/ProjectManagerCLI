import { Action } from '@ngrx/store';

import { IUser } from '../../models/user';

export enum EUserActions {
      Failure = '[User] Failure',
      GetCurrentUser = '[User] Get Current User',
      GetCurrentUserSuccess = '[User] Get Current User Success',
      GetUsersFromBoard = '[User] Get Users from Board',
      GetUsersFromBoardSuccess = '[User] Get Users from Board Success',
      GetUser = '[User] Get User',
      GetUserSuccess = '[User] Get User Success'

}

//#region Failure

export class Failure implements Action {
      public readonly type = EUserActions.Failure;
      constructor(public payload: string) {}
}

//#endregion

//#region Get Current User

export class GetCurrentUser implements Action {
      public readonly type = EUserActions.GetCurrentUser;
}

export class GetCurrentUserSuccess implements Action {
      public readonly type = EUserActions.GetCurrentUserSuccess;
      constructor(public payload: IUser) {}
}

//#endregion

//#region Get Users from Board

export class GetUsersFromBoard implements Action {
      public readonly type = EUserActions.GetUsersFromBoard;
      constructor(public payload: number) {}
}

export class GetUsersFromBoardSuccess implements Action {
      public readonly type = EUserActions.GetUsersFromBoardSuccess;
      constructor(public payload: IUser[]) {}
}

//#endregion

//#region Get User

export class GetUser implements Action {
      public readonly type = EUserActions.GetUser;
      constructor(public payload: number) {}
}

export class GetUserSuccess implements Action {
      public readonly type = EUserActions.GetUserSuccess;
      constructor(public payload: IUser) {}
}

//#endregion

export type UserActions =
      | Failure
      | GetCurrentUser
      | GetCurrentUserSuccess
      | GetUsersFromBoard
      | GetUsersFromBoardSuccess
      | GetUser
      | GetUserSuccess
      ;
