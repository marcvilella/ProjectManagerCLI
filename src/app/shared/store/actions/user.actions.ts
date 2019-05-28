import { Action } from '@ngrx/store';

import { IUser } from '../../models/user';

export enum EUserActions {
      Failure = '[User] Failure',
      GetCurrentUser = '[User] Get Current User',
      GetCurrentUserSuccess = '[User] Get Current User Success',
      GetUsersByBoard = '[User] Get Users By Board',
      GetUsersByBoardSuccess = '[User] Get Users By Board Success',
      GetUser = '[User] Get User',
      GetUserSuccess = '[User] Get User Success',

      UpdateUserBoardPermission = '[User] Update User Board Permission',
      UpdateUserBoardPermissionSuccess = '[User] Update User Board Permission Success'
}

//#region Failure

export class Failure implements Action {
      public readonly type = EUserActions.Failure;
      constructor(public payload: string) {}
}

//#endregion

//#region Get

export class GetUser implements Action {
      public readonly type = EUserActions.GetUser;
      constructor(public payload: number) {}
}

export class GetUserSuccess implements Action {
      public readonly type = EUserActions.GetUserSuccess;
      constructor(public payload: IUser) {}
}

export class GetCurrentUser implements Action {
      public readonly type = EUserActions.GetCurrentUser;
}

export class GetCurrentUserSuccess implements Action {
      public readonly type = EUserActions.GetCurrentUserSuccess;
      constructor(public payload: IUser) {}
}

export class GetUsersByBoard implements Action {
      public readonly type = EUserActions.GetUsersByBoard;
      constructor(public payload: {id: number}) {}
}

export class GetUsersByBoardSuccess implements Action {
      public readonly type = EUserActions.GetUsersByBoardSuccess;
      constructor(public payload: IUser[]) {}
}

//#endregion

//#region Update

export class UpdateUserBoardPermission implements Action {
      public readonly type = EUserActions.UpdateUserBoardPermission;
      constructor(public payload: {id: number, userId: number, role: string}) {}
}

export class UpdateUserBoardPermissionSuccess implements Action {
      public readonly type = EUserActions.UpdateUserBoardPermissionSuccess;
      constructor(public payload: {id: number, userId: number, role: string}) {}
}

//#endregion

export type UserActions =
      | Failure

      | GetUser                     | GetUserSuccess
      | GetCurrentUser              | GetCurrentUserSuccess
      | GetUsersByBoard             | GetUsersByBoardSuccess

      | UpdateUserBoardPermission   | UpdateUserBoardPermissionSuccess
      ;
