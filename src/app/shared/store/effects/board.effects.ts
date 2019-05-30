import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { switchMap, map, withLatestFrom, tap, catchError, } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';

// State
import { IAppState } from '../state/app.state';
import { IBoard, ICardList, ICardItem, IDueDate, IAttachment, ICheckList, ICheckItem } from '../../models/boards';
import * as boardActions from '../actions/board.actions';
import * as boardSelectors from '../selectors/board.selectors';
import * as userActions from '../actions/user.actions';



// Services
import { BoardsService } from '../../services/boards.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/user';

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
                  this.router.navigate(['/app/board/' + board._id]);
                  return of(new boardActions.AddBoardSuccess({board: board}));
            })
      );

      @Effect()
      addBoardMember$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.AddBoardMember>(boardActions.EBoardActions.AddBoardMember),
            switchMap(action => this._boardsService.addBoardMember(action.payload)),
            switchMap((user: IUser) => of(new userActions.GetUserSuccess(user)))
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
      updateCardListPosition$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.UpdateCardListPosition>(boardActions.EBoardActions.UpdateCardListPosition),
            switchMap(action => this._boardsService.updateCardListPosition(action.payload)),
            switchMap((cardlists: ICardList[]) => of(new boardActions.UpdateCardListPositionSuccess({cardLists: cardlists})))
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
      getCardItem$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.GetCardItem>(boardActions.EBoardActions.GetCardItem),
            switchMap(action => this._boardsService.getCardItem(action.payload)),
            switchMap((carditem: ICardItem) => of(new boardActions.GetCardItemSuccess({cardItem: carditem})))
      );

      @Effect()
      addCardItem$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.AddCardItem>(boardActions.EBoardActions.AddCardItem),
            switchMap(action => this._boardsService.addCardItem(action.payload)),
            switchMap((carditem: ICardItem) => of(new boardActions.AddCardItemSuccess({cardItem: carditem})))
      );

      @Effect()
      addCardItemMember$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.AddCardItemMember>(boardActions.EBoardActions.AddCardItemMember),
            switchMap(action => this._boardsService.addCardItemMember(action.payload)),
            switchMap((data: {id: number, userId: number}) => of(new boardActions.AddCardItemMemberSuccess(data)))
      );

      @Effect()
      addCardItemAttachment$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.AddCardItemAttachment>(boardActions.EBoardActions.AddCardItemAttachment),
            switchMap(action => this._boardsService.addCardItemAttachment(action.payload)),
            switchMap((data: {cardId: number, attachment: IAttachment}) => of(new boardActions.AddCardItemAttachmentSuccess(data)))
      );

      @Effect()
      addCardItemChecklist$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.AddCardItemChecklist>(boardActions.EBoardActions.AddCardItemChecklist),
            switchMap(action => this._boardsService.addCardItemChecklist(action.payload)),
            switchMap((data: {id: number, checklist: ICheckList}) => of(new boardActions.AddCardItemChecklistSuccess(data)))
      );

      @Effect()
      addCardItemChecklistItem$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.AddCardItemChecklistItem>(boardActions.EBoardActions.AddCardItemChecklistItem),
            switchMap(action => this._boardsService.addCardItemChecklistItem(action.payload)),
            switchMap((data: {id: number, checklistId: number, checkitem: ICheckItem}) => of(new boardActions.AddCardItemChecklistItemSuccess(data)))
      );

      @Effect()
      updateCardItemPosition$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.UpdateCardItemPosition>(boardActions.EBoardActions.UpdateCardItemPosition),
            switchMap(action => this._boardsService.updateCardItemPosition(action.payload)),
            switchMap((id: number) => of(new boardActions.UpdateCardItemPositionSuccess({id: id})))
      );

      @Effect()
      updateCardItemProperties$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.UpdateCardItemProperties>(boardActions.EBoardActions.UpdateCardItemProperties),
            switchMap(action => this._boardsService.updateCardItemProperties(action.payload)),
            switchMap((data: {id: number, name: string, description: string}) => of(new boardActions.UpdateCardItemPropertiesSuccess(data)))
      );

      @Effect()
      updateCardItemDueDate$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.UpdateCardItemDueDate>(boardActions.EBoardActions.UpdateCardItemDueDate),
            switchMap(action => this._boardsService.updateCardItemDueDate(action.payload)),
            switchMap((data: {id: number, dueDate: IDueDate}) => of(new boardActions.UpdateCardItemDueDateSuccess(data)))
      );

      @Effect()
      updateCardItemPriority$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.UpdateCardItemPriority>(boardActions.EBoardActions.UpdateCardItemPriority),
            switchMap(action => this._boardsService.updateCardItemPriority(action.payload)),
            switchMap((data: {id: number, priority: number}) => of(new boardActions.UpdateCardItemPrioritySuccess(data)))
      );

      @Effect()
      updateCardItemAttachment$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.UpdateCardItemAttachment>(boardActions.EBoardActions.UpdateCardItemAttachment),
            switchMap(action => this._boardsService.updateCardItemAttachment(action.payload)),
            switchMap((data: {id: number, cardId: number, name: string, value: string}) => of(new boardActions.UpdateCardItemAttachmentSuccess(data)))
      );

      @Effect()
      updateCardItemChecklist$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.UpdateCardItemChecklist>(boardActions.EBoardActions.UpdateCardItemChecklist),
            switchMap(action => this._boardsService.updateCardItemChecklist(action.payload)),
            switchMap((data: {id: number, checklistId: number, name: string, hide: boolean}) => of(new boardActions.UpdateCardItemChecklistSuccess(data)))
      );

      @Effect()
      updateCardItemChecklistItem$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.UpdateCardItemChecklistItem>(boardActions.EBoardActions.UpdateCardItemChecklistItem),
            switchMap(action => this._boardsService.updateCardItemChecklistItem(action.payload)),
            switchMap((data: {id: number, checkitemId: number, name: string, checked: boolean}) => of(new boardActions.UpdateCardItemChecklistItemSuccess(data)))
      );

      @Effect()
      deleteCardItem$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.DeleteCardItem>(boardActions.EBoardActions.DeleteCardItem),
            switchMap(action => this._boardsService.deleteCardItem(action.payload)),
            switchMap((id: number) => of(new boardActions.DeleteCardItemSuccess({id: id})))
      );

      @Effect()
      deleteCardItemMember$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.DeleteCardItemMember>(boardActions.EBoardActions.DeleteCardItemMember),
            switchMap(action => this._boardsService.deleteCardItemMember(action.payload)),
            switchMap((data: {id: number, userId: number}) => of(new boardActions.DeleteCardItemMemberSuccess(data)))
      );

      @Effect()
      deleteCardItemAttachment$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.DeleteCardItemAttachment>(boardActions.EBoardActions.DeleteCardItemAttachment),
            switchMap(action => this._boardsService.deleteCardItemAttachment(action.payload)),
            switchMap((data: {id: number, cardId: number}) => of(new boardActions.DeleteCardItemAttachmentSuccess(data)))
      );

      @Effect()
      deleteCardItemDueDate$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.DeleteCardItemDueDate>(boardActions.EBoardActions.DeleteCardItemDueDate),
            switchMap(action => this._boardsService.deleteCardItemDueDate(action.payload)),
            switchMap((id: number) => of(new boardActions.DeleteCardItemDueDateSuccess({id: id})))
      );

      @Effect()
      deleteCardItemChecklist$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.DeleteCardItemChecklist>(boardActions.EBoardActions.DeleteCardItemChecklist),
            switchMap(action => this._boardsService.deleteCardItemChecklist(action.payload)),
            switchMap((data: {id: number, checklistId: number}) => of(new boardActions.DeleteCardItemChecklistSuccess(data)))
      );

      @Effect()
      deleteCardItemChecklistItem$: Observable<Action> = this._actions$.pipe(
            ofType<boardActions.DeleteCardItemChecklistItem>(boardActions.EBoardActions.DeleteCardItemChecklistItem),
            switchMap(action => this._boardsService.deleteCardItemChecklistItem(action.payload)),
            switchMap((data: {id: number, checkitemId: number}) => of(new boardActions.DeleteCardItemChecklistItemSuccess(data)))
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
