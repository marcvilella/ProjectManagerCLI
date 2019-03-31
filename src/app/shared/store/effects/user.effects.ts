import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { switchMap, map, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { UsersService } from '../../services/users.service';
import { IAppState } from '../state/app.state';
import { IUser } from '../../models/user';
import * as userActions from '../actions/user.actions';
import * as boardActions from '../actions/board.actions';
import * as userSelectors from '../selectors/user.selectors';

@Injectable()
export class UserEffects {

      constructor(
            private _usersService: UsersService,
            private _actions$: Actions,
            private _store: Store<IAppState>
      ) {}

      @Effect()
      getCurrentUser$ = this._actions$.pipe(
            ofType<userActions.GetCurrentUser>(userActions.EUserActions.GetCurrentUser),
            mergeMap(() => this._usersService.getCurrentUser()),
            switchMap((user: IUser) => {
                  // this._store.dispatch(new boardActions.UpdateBoardsStarredInternal(user.boards));
                  return of(new userActions.GetCurrentUserSuccess(user));
            })
      );

      @Effect()
      getUsers$ = this._actions$.pipe(
            ofType<userActions.GetUsersFromBoard>(userActions.EUserActions.GetUsersFromBoard),
            switchMap(action => this._usersService.getUsersFromBoard(action.payload)),
            switchMap((users: IUser[]) => of(new userActions.GetUsersFromBoardSuccess(users)))
      );

      @Effect()
      getUser$ = this._actions$.pipe(
            ofType<userActions.GetUser>(userActions.EUserActions.GetUser),
            mergeMap(action => this._usersService.getUser(action.payload)),
            switchMap((user: IUser) => of(new userActions.GetUserSuccess(user)))
      );
}
