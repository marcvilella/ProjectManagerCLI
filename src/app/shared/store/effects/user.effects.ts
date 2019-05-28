import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';

import { UsersService } from '../../services/users.service';
import { IAppState } from '../state/app.state';
import { IUser } from '../../models/user';
import * as userActions from '../actions/user.actions';

@Injectable()
export class UserEffects {

      constructor(
            private _usersService: UsersService,
            private _actions$: Actions,
            private _store: Store<IAppState>
      ) {}

      //#region Get

      @Effect()
      getCurrentUser$ = this._actions$.pipe(
            ofType<userActions.GetCurrentUser>(userActions.EUserActions.GetCurrentUser),
            mergeMap(() => this._usersService.getCurrentUser()),
            switchMap((user: IUser) => {
                  return of(new userActions.GetCurrentUserSuccess(user));
            })
      );

      @Effect()
      getUsersByBoard$ = this._actions$.pipe(
            ofType<userActions.GetUsersByBoard>(userActions.EUserActions.GetUsersByBoard),
            switchMap(action => this._usersService.getUsersByBoard(action.payload)),
            switchMap((users: IUser[]) => of(new userActions.GetUsersByBoardSuccess(users)))
      );

      @Effect()
      getUser$ = this._actions$.pipe(
            ofType<userActions.GetUser>(userActions.EUserActions.GetUser),
            mergeMap(action => this._usersService.getUser(action.payload)),
            switchMap((user: IUser) => of(new userActions.GetUserSuccess(user)))
      );

      //#endregion

      //#region Update

      @Effect()
      updateUserBoardPermission$: Observable<Action> = this._actions$.pipe(
            ofType<userActions.UpdateUserBoardPermission>(userActions.EUserActions.UpdateUserBoardPermission),
            switchMap(action => this._usersService.updateUserBoardPermission(action.payload)),
            switchMap((data: {id: number, userId: number, role: string}) => of(new userActions.UpdateUserBoardPermissionSuccess(data)))
      );

      //#endregion
}
