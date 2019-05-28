import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SocketService } from './socket.service';
import { EUserActions } from '../store/actions/user.actions';

import { IUser } from '../models/user';

@Injectable()
export class UsersService {

  getUserSuccess$: Observable<IUser>;
  getCurrentUserSuccess$: Observable<IUser>;
  getUsersByBoardSuccess$: Observable<IUser[]>;

  updateUserBoardPermissionSuccess$: Observable<{id: number, userId: number, role: string}>;

  constructor(private socket: SocketService) {

    this.getUserSuccess$ = this.socket.listen(EUserActions.GetUserSuccess);
    this.getCurrentUserSuccess$ = this.socket.listen(EUserActions.GetCurrentUserSuccess);
    this.getUsersByBoardSuccess$ = this.socket.listen(EUserActions.GetUsersByBoardSuccess);

    this.updateUserBoardPermissionSuccess$ = this.socket.listen(EUserActions.UpdateUserBoardPermissionSuccess);

  }

  //#region Get

  getCurrentUser() {
    this.socket.emit(EUserActions.GetCurrentUser);
    return this.getCurrentUserSuccess$;
  }

  getUser(id: number) {
    this.socket.emit(EUserActions.GetUser, id);
    return this.getUserSuccess$;
  }

  getUsersByBoard(data: {id: number}) {
    this.socket.emit(EUserActions.GetUsersByBoard, data);
    return this.getUsersByBoardSuccess$;
  }

  //#endregion

  //#region Update

  updateUserBoardPermission(data: {id: number, userId: number, role: string}) {
    this.socket.emit(EUserActions.UpdateUserBoardPermission, data);
    return this.updateUserBoardPermissionSuccess$;
  }

  //#endregion

}
