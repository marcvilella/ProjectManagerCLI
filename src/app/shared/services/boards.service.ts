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

  constructor(private socket: SocketService) {

    console.log('Joining')
    this.socket.join('boards');

    // Every socket BOARDS event has it's own observable, will be used by ngrx effects
    this.getBoardsSuccess$ = this.socket.listen(EBoardActions.GetBoardsSuccess);
    this.getBoardSuccess$ = this.socket.listen(EBoardActions.GetBoardSuccess);
    this.addBoardSuccess$ = this.socket.listen(EBoardActions.AddBoardSuccess);

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

}