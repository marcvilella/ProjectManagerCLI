import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { switchMap, map, withLatestFrom, tap, } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';

//State
import { IAppState } from '../state/app.state';
import { IBoard } from '../../models/boards';
import * as boardActions from '../actions/board.actions';
import * as boardSelectors from '../selectors/board.selectors';



//Services
import { BoardsService } from '../../services/boards.service';
import { Router } from '@angular/router';

@Injectable()
export class BoardEffects {
      
      @Effect()
      getBoards$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.GetBoards>(boardActions.EBoardActions.GetBoards),
            switchMap(() => this._boardsService.getBoards()),
            switchMap((boards: IBoard[]) => of(new boardActions.GetBoardsSuccess(boards)))
      );

      @Effect()
      getBoard$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.GetBoard>(boardActions.EBoardActions.GetBoard),
            switchMap(action => this._boardsService.getBoard(action.payload)),
            switchMap((board: IBoard) => of(new boardActions.GetBoardSuccess(board)))
      );

      @Effect()
      addBoard$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.AddBoard>(boardActions.EBoardActions.AddBoard),
            switchMap(action => this._boardsService.addBoard(action.payload)),
            switchMap((board: IBoard) => {
                  this.router.navigate(['/app/board'], {queryParams: {id : board._id}})
                  return of(new boardActions.AddBoardSuccess(board))
            }),
            //tap(() => this.router.navigate(['/app'], {queryParams: {id : board._id}}))
      );

      @Effect()
      updateBoard$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.UpdateBoard>(boardActions.EBoardActions.UpdateBoard),
            switchMap(action => this._boardsService.updateBoard(action.payload.id, action.payload.name)),
            switchMap((board: IBoard) => of(new boardActions.UpdateBoardSuccess(board)))
      );

      @Effect()
      updateBoardStarred$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.UpdateBoardStarred>(boardActions.EBoardActions.UpdateBoardStarred),
            switchMap(action => this._boardsService.updateBoardStarred(action.payload.id, action.payload.starred)),
            switchMap((board: IBoard) => of(new boardActions.UpdateBoardStarredSuccess(board)))
      );



      constructor(
            private _boardsService: BoardsService,
            private _actions$: Actions,
            private _store: Store<IAppState>,
            private router: Router
      ){}
}
