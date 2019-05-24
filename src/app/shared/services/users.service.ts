import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SocketService } from './socket.service';
import { EUserActions } from '../store/actions/user.actions';

import { IUser } from '../models/user';

@Injectable()
export class UsersService {

  getCurrentUserSuccess$: Observable<IUser>;
  getUsersFromBoardSuccess$: Observable<IUser[]>;
  getUserSuccess$: Observable<IUser>;

  constructor(private socket: SocketService) {

    // Every socket USERS event has it's own observable, will be used by ngrx effects
    this.getCurrentUserSuccess$ = this.socket.listen(EUserActions.GetCurrentUserSuccess);
    this.getUsersFromBoardSuccess$ = this.socket.listen(EUserActions.GetUsersFromBoardSuccess);
    this.getUserSuccess$ = this.socket.listen(EUserActions.GetUserSuccess);

  }

  // These methods will be called by ngrx effects (do not use directly in the components)
  getCurrentUser() {
    this.socket.emit(EUserActions.GetCurrentUser);
    return this.getCurrentUserSuccess$;
  }

  getUsersFromBoard(id: number) {
    this.socket.emit(EUserActions.GetUsersFromBoard);
    return this.getUsersFromBoardSuccess$;
  }

  getUser(id: number) {
    this.socket.emit(EUserActions.GetUser, id);
    return this.getUserSuccess$;
  }

}
