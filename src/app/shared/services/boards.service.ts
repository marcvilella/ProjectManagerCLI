import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SocketService } from './socket.service';
import { EBoardActions } from '../store/actions/board.actions';

import { IBoard, ICardList, ICardItem } from '../models/boards';

@Injectable()
export class BoardsService {

  error$: Observable<any>;

  getBoardsSuccess$: Observable<IBoard[]>;
  getBoardSuccess$: Observable<IBoard>;
  addBoardSuccess$: Observable<IBoard>;
  updateBoardSuccess$: Observable<IBoard>;
  updateBoardStarredSuccess$: Observable<IBoard>;
  deleteBoardSuccess$: Observable<number>;
  archiveBoardSuccess$: Observable<number>;

  getCardListsSuccess$: Observable<ICardList[]>;
  addCardListSuccess$: Observable<ICardList>;
  updateCardListPositionSuccess$: Observable<ICardList[]>;
  moveCardListItemsSuccess$: Observable<ICardList[]>;
  sortCardListSuccess$: Observable<ICardItem[]>;
  deleteCardListSuccess$: Observable<number>;
  archiveCardListSuccess$: Observable<number>;

  getCardItemsSuccess$: Observable<ICardItem[]>;
  addCardItemSuccess$: Observable<ICardItem>;
  updateCardItemPositionSuccess$: Observable<number>;
  deleteCardItemSuccess$: Observable<number>;
  archiveCardItemSuccess$: Observable<number>;

  constructor(private socket: SocketService) {

    this.error$ = this.socket.listen(EBoardActions.Failure);

    this.getBoardsSuccess$ = this.socket.listen(EBoardActions.GetBoardsSuccess);
    this.getBoardSuccess$ = this.socket.listen(EBoardActions.GetBoardSuccess);
    this.addBoardSuccess$ = this.socket.listen(EBoardActions.AddBoardSuccess);
    this.updateBoardSuccess$ = this.socket.listen(EBoardActions.UpdateBoardSuccess);
    this.updateBoardStarredSuccess$ = this.socket.listen(EBoardActions.UpdateBoardStarredSuccess);
    this.deleteBoardSuccess$ = this.socket.listen(EBoardActions.DeleteBoardSuccess);
    this.archiveBoardSuccess$ = this.socket.listen(EBoardActions.ArchiveBoardSuccess);

    this.getCardListsSuccess$ = this.socket.listen(EBoardActions.GetCardListsSuccess);
    this.addCardListSuccess$ = this.socket.listen(EBoardActions.AddCardListSuccess);
    this.updateCardListPositionSuccess$ = this.socket.listen(EBoardActions.UpdateCardListPositionSuccess);
    this.moveCardListItemsSuccess$ = this.socket.listen(EBoardActions.MoveCardListItemsSuccess);
    this.sortCardListSuccess$ = this.socket.listen(EBoardActions.SortCardListSuccess);
    this.deleteCardListSuccess$ = this.socket.listen(EBoardActions.DeleteCardListSuccess);
    this.archiveCardListSuccess$ = this.socket.listen(EBoardActions.ArchiveCardListSuccess);

    this.getCardItemsSuccess$ = this.socket.listen(EBoardActions.GetCardItemsSuccess);
    this.addCardItemSuccess$ = this.socket.listen(EBoardActions.AddCardItemSuccess);
    this.updateCardItemPositionSuccess$ = this.socket.listen(EBoardActions.UpdateCardItemPositionSuccess);
    this.deleteCardItemSuccess$ = this.socket.listen(EBoardActions.DeleteCardItemSuccess);
    this.archiveCardItemSuccess$ = this.socket.listen(EBoardActions.ArchiveCardItemSuccess);
  }

  //#region Board

  getBoards() {
    this.socket.emit(EBoardActions.GetBoards);
    return this.getBoardsSuccess$;
  }

  getBoard(data: {id: number}) {
    this.socket.join(data.id.toString());
    this.socket.emit(EBoardActions.GetBoard, data);
    return this.getBoardSuccess$;
  }

  addBoard(data: {board: IBoard}) {
    this.socket.emit(EBoardActions.AddBoard, data.board);
    return this.addBoardSuccess$;
  }

  updateBoard(data: {id: number, name?: string, mode?: string, colorLight?: string, colorDark?: string}) {

    let datax = {};

    if (data.mode !== undefined || data.colorLight !== undefined || data.colorDark !== undefined) {
      datax = {
        id: data.id,
        name: data.name,
        settings: {
          mode: data.mode,
          colorLight: data.colorLight,
          colorDark: data.colorDark
        }
      };
    } else {
      datax = {
        id: data.id,
        name: data.name
      };
    }

      console.log('Check UPDATE BOARD:');
      console.log('DATA:');
      console.log(data);
      console.log('DATAX:');
      console.log(datax);

    this.socket.emit(EBoardActions.UpdateBoard, datax);
    return this.updateBoardSuccess$;
  }

  updateBoardStarred(data: {id: number, starred: boolean}) {
    this.socket.emit(EBoardActions.UpdateBoardStarred, data);
    return this.updateBoardStarredSuccess$;
  }

  deleteBoard(data: {id: number}) {
    this.socket.emit(EBoardActions.DeleteBoard, data);
    return this.deleteBoardSuccess$;
  }

  archiveBoard(data: {id: number}) {
    this.socket.emit(EBoardActions.ArchiveBoard, data);
    return this.archiveBoardSuccess$;
  }

  //#endregion

  //#region Card List

  getCardLists(data: {id: number}) {
    this.socket.emit(EBoardActions.GetCardLists, data);
    return this.getCardListsSuccess$;
  }

  addCardList(data: {id: number, name: string}) {
    this.socket.emit(EBoardActions.AddCardList, data);
    return this.addCardListSuccess$;
  }

  updateCardListPosition(data: {cardLists: ICardList[]}) {
    this.socket.emit(EBoardActions.UpdateCardListPosition, data);
    return this.updateCardListPositionSuccess$;
  }

  moveCardListItems(data: {id: number, destinationId: number}) {
    this.socket.emit(EBoardActions.MoveCardListItems, data);
    return this.moveCardListItemsSuccess$;
  }

  sortCardList(data: {id: number}) {
    this.socket.emit(EBoardActions.SortCardList, data);
    return this.sortCardListSuccess$;
  }

  deleteCardList(data: {id: number}) {
    this.socket.emit(EBoardActions.DeleteCardList, data);
    return this.deleteCardListSuccess$;
  }

  archiveCardList(data: {id: number}) {
    this.socket.emit(EBoardActions.ArchiveCardList, data);
    return this.archiveCardListSuccess$;
  }

  //#endregion

  //#region Card Item

  getCardItems(data: {id: number}) {
    this.socket.emit(EBoardActions.GetCardItems, data);
    return this.getCardItemsSuccess$;
  }

  addCardItem(data: {id: number, name: string}) {
    this.socket.emit(EBoardActions.AddCardItem, data);
    return this.addCardItemSuccess$;
  }

  updateCardItemPosition(data: {
    changedId?: number,
    from?: {id: number, carditems: ICardItem[]},
    to: {id: number, carditems: ICardItem[]}
  }) {

    let recomposedData = {};
    if (data.changedId !== undefined) {
      recomposedData = {
        changedId: data.changedId,
        from: {
          id: data.from.id,
          carditems: data.from.carditems.map(cardItem => <any>{id: cardItem._id, position: cardItem.position})
        },
        to: {
          id: data.to.id,
          carditems: data.to.carditems.map(cardItem => <any>{id: cardItem._id, position: cardItem.position})
        }
      };
    } else {
      recomposedData = {
        to: {
          id: data.to.id,
          carditems: data.to.carditems.map(cardItem => <any>{id: cardItem._id, position: cardItem.position})
        }
      };
    }

    this.socket.emit(EBoardActions.UpdateCardItemPosition, recomposedData);
    return this.updateCardItemPositionSuccess$;
  }

  deleteCardItem(data: {id: number}) {
    this.socket.emit(EBoardActions.DeleteCardItem, data);
    return this.deleteCardItemSuccess$;
  }

  archiveCardItem(data: {id: number}) {
    this.socket.emit(EBoardActions.ArchiveCardItem, data);
    return this.archiveCardItemSuccess$;
  }

  //#endregion

}
