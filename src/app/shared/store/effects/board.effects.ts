import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { switchMap, map, withLatestFrom, tap, catchError, } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';

// State
import { IAppState } from '../state/app.state';
import { IBoard, ICardList, ICardItem } from '../../models/boards';
import * as boardActions from '../actions/board.actions';
import * as boardSelectors from '../selectors/board.selectors';



// Services
import { BoardsService } from '../../services/boards.service';
import { Router } from '@angular/router';

@Injectable()
export class BoardEffects {

      @Effect()
      error$: Observable<Action> = this._boardsService.error$.pipe(
            switchMap((error: any) => of(new boardActions.Failure(error)))
      );

      //#region Board

      @Effect()
      getBoards$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.GetBoards>(boardActions.EBoardActions.GetBoards),
            switchMap(() => this._boardsService.getBoards()),
            switchMap((boards: IBoard[]) => of(new boardActions.GetBoardsSuccess({boards: boards})))
      );

      @Effect()
      getBoard$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.GetBoard>(boardActions.EBoardActions.GetBoard),
            switchMap(action => this._boardsService.getBoard(action.payload)),
            switchMap((board: IBoard) => of(new boardActions.GetBoardSuccess({board: board})))
      );

      @Effect()
      addBoard$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.AddBoard>(boardActions.EBoardActions.AddBoard),
            switchMap(action => this._boardsService.addBoard(action.payload)),
            switchMap((board: IBoard) => {
                  this.router.navigate(['/app/board'], {queryParams: {id : board._id}});
                  return of(new boardActions.AddBoardSuccess({board: board}));
            })
      );

      @Effect()
      updateBoard$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.UpdateBoard>(boardActions.EBoardActions.UpdateBoard),
            switchMap(action => this._boardsService.updateBoard(action.payload)),
            switchMap((board: IBoard) => of(new boardActions.UpdateBoardSuccess({board: board})))
      );

      @Effect()
      updateBoardStarred$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.UpdateBoardStarred>(boardActions.EBoardActions.UpdateBoardStarred),
            switchMap(action => this._boardsService.updateBoardStarred(action.payload)),
            switchMap((board: IBoard) => of(new boardActions.UpdateBoardStarredSuccess({board: board})))
      );

      @Effect()
      deleteBoard$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.DeleteBoard>(boardActions.EBoardActions.DeleteBoard),
            switchMap(action => this._boardsService.deleteBoard(action.payload)),
            switchMap((id: number) => of(new boardActions.DeleteBoardSuccess({id: id})))
      );

      @Effect()
      archiveBoard$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.ArchiveBoard>(boardActions.EBoardActions.ArchiveBoard),
            switchMap(action => this._boardsService.archiveBoard(action.payload)),
            switchMap((id: number) => of(new boardActions.ArchiveBoardSuccess({id: id})))
      );

      //#endregion

      //#region Card List

      @Effect()
      getCardLists$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.GetCardLists>(boardActions.EBoardActions.GetCardLists),
            switchMap(action => this._boardsService.getCardLists(action.payload)),
            switchMap((cardlists: ICardList[]) => of(new boardActions.GetCardListsSuccess({cardLists: cardlists})))
      );

      @Effect()
      getCardListsSuccess$: Observable<Action> = this._boardsService.getCardListsSuccess$.pipe(
            switchMap(cardlists => of(new boardActions.GetCardListsSuccess({cardLists: cardlists}))
      ));

      @Effect()
      addCardList$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.AddCardList>(boardActions.EBoardActions.AddCardList),
            switchMap(action => this._boardsService.addCardList(action.payload)),
            switchMap((cardlist: ICardList) => of(new boardActions.AddCardListSuccess({cardList: cardlist})))
      );

      @Effect()
      updateCardListPriority$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.UpdateCardListPriority>(boardActions.EBoardActions.UpdateCardListPriority),
            switchMap(action => this._boardsService.updateCardListPriority(action.payload)),
            switchMap((id: number) => of(new boardActions.UpdateCardListPrioritySuccess({id: id})))
      );

      @Effect()
      moveCardListItems$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.MoveCardListItems>(boardActions.EBoardActions.MoveCardListItems),
            switchMap(action => this._boardsService.moveCardListItems(action.payload)),
            switchMap((cardlists: ICardList[]) => of(new boardActions.MoveCardListItemsSuccess({cardLists: cardlists})))
      );

      @Effect()
      sortCardList$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.SortCardList>(boardActions.EBoardActions.SortCardList),
            switchMap(action => this._boardsService.sortCardList(action.payload)),
            switchMap((carditems: ICardItem[]) => of(new boardActions.SortCardListSuccess({cardItems: carditems})))
      );

      @Effect()
      deleteCardList$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.DeleteCardList>(boardActions.EBoardActions.DeleteCardList),
            switchMap(action => this._boardsService.deleteCardList(action.payload)),
            switchMap((id: number) => of(new boardActions.DeleteCardListSuccess({id: id})))
      );

      @Effect()
      archiveCardList$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.ArchiveCardList>(boardActions.EBoardActions.ArchiveCardList),
            switchMap(action => this._boardsService.archiveCardList(action.payload)),
            switchMap((id: number) => of(new boardActions.ArchiveCardListSuccess({id: id})))
      );

      //#endregion

      //#region Card Item

      @Effect()
      getCardItems$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.GetCardLists>(boardActions.EBoardActions.GetCardLists),
            switchMap(action => this._boardsService.getCardItems(action.payload)),
            switchMap((carditems: ICardItem[]) => of(new boardActions.GetCardItemsSuccess({cardItems: carditems})))
      );

      @Effect()
      getCardItemsSuccess$: Observable<Action> = this._boardsService.getCardItemsSuccess$.pipe(
            switchMap(carditems => of(new boardActions.GetCardItemsSuccess({cardItems: carditems}))
      ));

      @Effect()
      addCardItem$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.AddCardItem>(boardActions.EBoardActions.AddCardItem),
            switchMap(action => this._boardsService.addCardItem(action.payload)),
            switchMap((carditem: ICardItem) => of(new boardActions.AddCardItemSuccess({cardItem: carditem})))
      );

      @Effect()
      updateCardItemPriority$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.UpdateCardItemPriority>(boardActions.EBoardActions.UpdateCardItemPriority),
            switchMap(action => this._boardsService.updateCardItemPriority(action.payload)),
            switchMap((id: number) => of(new boardActions.UpdateCardItemPrioritySuccess({id: id})))
      );

      @Effect()
      deleteCardItem$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.DeleteCardItem>(boardActions.EBoardActions.DeleteCardItem),
            switchMap(action => this._boardsService.deleteCardItem(action.payload)),
            switchMap((id: number) => of(new boardActions.DeleteCardItemSuccess({id: id})))
      );

      @Effect()
      archiveCardItem$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.ArchiveCardItem>(boardActions.EBoardActions.ArchiveCardItem),
            switchMap(action => this._boardsService.archiveCardItem(action.payload)),
            switchMap((id: number) => of(new boardActions.ArchiveCardItemSuccess({id: id})))
      );

      //#endregion

      constructor(
            private _boardsService: BoardsService,
            private _actions$: Actions,
            private _store: Store<IAppState>,
            private router: Router
      ) {}
}
