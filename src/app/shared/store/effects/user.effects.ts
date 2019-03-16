import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { EUserActions, GetUser, GetUserSuccess, GetUsers, GetUsersSuccess } from '../actions/user.actions';
import { AuthService } from '../../services/auth.service';
import { selectUserList } from '../selectors/user.selectors';
import { IUser } from '../../models/user';

@Injectable()
export class UserEffects {
      
      @Effect()
      getUser$ = this._actions$.pipe(
            ofType<GetUser>(EUserActions.GetUser),
            map(action => action.payload),
            withLatestFrom(this._store.pipe(select(selectUserList))),
            switchMap(([id, users]) => {
                  let selectedUser = users.filter(user => user._id === +id)[0];
                  return of(new GetUserSuccess(selectedUser));
            })
      );

      @Effect()
      getUsers$ = this._actions$.pipe(
            ofType<GetUsers>(EUserActions.GetUsers),
            switchMap(() => this._authService.getUsers()),
            switchMap((users: IUser[]) => of(new GetUsersSuccess(users)))
      );


      constructor(
            private _authService: AuthService,
            private _actions$: Actions,
            private _store: Store<IAppState>
      ){}
}
