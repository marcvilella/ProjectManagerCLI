import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SocketService } from './socket.service';
import { EBoardActions } from '../store/actions/board.actions';

import { IBoard } from '../models/boards';

@Injectable()
export class BoardsService {

  getBoardsSuccess$: Observable<IBoard[]>;
  getBoardSuccess$: Observable<IBoard>;
  addBoardSuccess$: Observable<IBoard>;
  updateBoardSuccess$: Observable<IBoard>;
  updateBoardStarredSuccess$: Observable<IBoard>;

  constructor(private socket: SocketService) {

    this.socket.join('boards');

    // Every socket BOARDS event has it's own observable, will be used by ngrx effects
    this.getBoardsSuccess$ = this.socket.listen(EBoardActions.GetBoardsSuccess);
    this.getBoardSuccess$ = this.socket.listen(EBoardActions.GetBoardSuccess);
    this.addBoardSuccess$ = this.socket.listen(EBoardActions.AddBoardSuccess);
    this.updateBoardSuccess$ = this.socket.listen(EBoardActions.UpdateBoardSuccess);
    this.updateBoardStarredSuccess$ = this.socket.listen(EBoardActions.UpdateBoardStarredSuccess);

  }

  // These methods will be called by ngrx effects (do not use directly in the components)
  getBoards() {
    this.socket.emit(EBoardActions.GetBoards);
    return this.getBoardsSuccess$;
  }

  getBoard(id: number) {
    this.socket.emit(EBoardActions.GetBoard, id);
    return this.getBoardSuccess$;
  }

  addBoard(data: IBoard) {
    this.socket.emit(EBoardActions.AddBoard, data);
    return this.addBoardSuccess$;
  }

  updateBoard(id: number, name?: string, mode?: string, colorLight?: string, colorDark?: string) {

    let data = {};

    if(mode != undefined || colorLight != undefined || colorDark != undefined)
      data = {
        _id: id, 
        name: name,
        settings: {
          mode: mode,
          colorLight: colorLight,
          colorDark: colorDark
        }
      };
    else
      data = {
        _id: id, 
        name: name
      }

    this.socket.emit(EBoardActions.UpdateBoard, data);
    return this.updateBoardSuccess$;
  }

  updateBoardStarred(id: number, starred: boolean) {
    this.socket.emit(EBoardActions.UpdateBoardStarred, {_id: id, starred: starred});
    return this.updateBoardStarredSuccess$;
  }

}