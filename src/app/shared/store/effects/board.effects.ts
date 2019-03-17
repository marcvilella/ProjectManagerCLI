import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { switchMap, map, withLatestFrom, } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';

//State
import { IAppState } from '../state/app.state';
import { IBoard } from '../../models/boards';

//Actions
import { EBoardActions, GetBoard, GetBoardSuccess, GetBoards, GetBoardsSuccess, AddBoard, AddBoardSuccess } from '../actions/board.actions';

//Selectors
import { selectBoardList } from '../selectors/board.selectors';

//Services
import { BoardsService } from '../../services/boards.service';

@Injectable()
export class BoardEffects {
      
      @Effect()
      getBoards$: Observable<Action> = this._actions$.pipe(
            ofType<GetBoards>(EBoardActions.GetBoards),
            switchMap(() => this._boardsService.getBoards()),
            switchMap((boards: IBoard[]) => of(new GetBoardsSuccess(boards)))
      );

      @Effect()
      getBoard$: Observable<Action> = this._actions$.pipe(
            ofType<GetBoard>(EBoardActions.GetBoard),
            switchMap(action => this._boardsService.getBoard(action.payload)),
            switchMap((board: IBoard) => of(new GetBoardSuccess(board)))
      );

      @Effect()
      addBoard$: Observable<Action> = this._actions$.pipe(
            ofType<AddBoard>(EBoardActions.AddBoard),
            switchMap(action => this._boardsService.addBoard(action.payload)),
            switchMap((board: IBoard) => of(new AddBoardSuccess(board)))
      );



      constructor(
            private _boardsService: BoardsService,
            private _actions$: Actions,
            private _store: Store<IAppState>
      ){}
}
