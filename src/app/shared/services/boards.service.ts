import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SocketService } from './socket.service';
import { EBoardActions } from '../store/actions/board.actions';

import { IBoard, ICardList, ICardItem, IDueDate, IAttachment, ICheckList, ICheckItem } from '../models/boards';

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
  getCardItemSuccess$: Observable<ICardItem>;
  addCardItemSuccess$: Observable<ICardItem>;
  addCardItemMemberSuccess$: Observable<{id: number, userId: number}>;
  addCardItemAttachmentSuccess$: Observable<{cardId: number, attachment: IAttachment}>;
  addCardItemChecklistSuccess$: Observable<{id: number, checklist: ICheckList}>;
  addCardItemChecklistItemSuccess$: Observable<{id: number, checklistId: number, checkitem: ICheckItem}>;
  updateCardItemPositionSuccess$: Observable<number>;
  updateCardItemProperties$: Observable<{id: number, name: string, description: string}>;
  updateCardItemDueDateSuccess$: Observable<{id: number, dueDate: IDueDate}>;
  updateCardItemPrioritySuccess$: Observable<{id: number, priority: number}>;
  updateCardItemAttachmentSuccess$: Observable<{id: number, cardId: number, name: string, value: string}>;
  updateCardItemChecklistSuccess$: Observable<{id: number, checklistId: number, name: string, hide: boolean}>;
  updateCardItemChecklistItemSuccess$: Observable<{id: number, checkitemId: number, name: string, checked: boolean}>;
  deleteCardItemSuccess$: Observable<number>;
  deleteCardItemMemberSuccess$: Observable<{id: number, userId: number}>;
  deleteCardItemDueDateSuccess$: Observable<number>;
  deleteCardItemAttachmentSuccess$: Observable<{id: number, cardId: number}>;
  deleteCardItemChecklistSuccess$: Observable<{id: number, checklistId: number}>;
  deleteCardItemChecklistItemSuccess$: Observable<{id: number, checkitemId: number}>;
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
    this.getCardItemSuccess$ = this.socket.listen(EBoardActions.GetCardItemSuccess);
    this.addCardItemSuccess$ = this.socket.listen(EBoardActions.AddCardItemSuccess);
    this.addCardItemMemberSuccess$ = this.socket.listen(EBoardActions.AddCardItemMemberSuccess);
    this.addCardItemAttachmentSuccess$ = this.socket.listen(EBoardActions.AddCardItemAttachmentSuccess);
    this.addCardItemChecklistSuccess$ = this.socket.listen(EBoardActions.AddCardItemChecklistSuccess);
    this.addCardItemChecklistItemSuccess$ = this.socket.listen(EBoardActions.AddCardItemChecklistItemSuccess);
    this.updateCardItemPositionSuccess$ = this.socket.listen(EBoardActions.UpdateCardItemPositionSuccess);
    this.updateCardItemProperties$ = this.socket.listen(EBoardActions.UpdateCardItemPropertiesSuccess);
    this.updateCardItemDueDateSuccess$ = this.socket.listen(EBoardActions.UpdateCardItemDueDateSuccess);
    this.updateCardItemPrioritySuccess$ = this.socket.listen(EBoardActions.UpdateCardItemPrioritySuccess);
    this.updateCardItemAttachmentSuccess$ = this.socket.listen(EBoardActions.UpdateCardItemAttachmentSuccess);
    this.updateCardItemChecklistSuccess$ = this.socket.listen(EBoardActions.UpdateCardItemChecklistSuccess);
    this.updateCardItemChecklistItemSuccess$ = this.socket.listen(EBoardActions.UpdateCardItemChecklistItemSuccess);
    this.deleteCardItemSuccess$ = this.socket.listen(EBoardActions.DeleteCardItemSuccess);
    this.deleteCardItemMemberSuccess$ = this.socket.listen(EBoardActions.DeleteCardItemMemberSuccess);
    this.deleteCardItemDueDateSuccess$ = this.socket.listen(EBoardActions.DeleteCardItemDueDateSuccess);
    this.deleteCardItemAttachmentSuccess$ = this.socket.listen(EBoardActions.DeleteCardItemAttachmentSuccess);
    this.deleteCardItemChecklistSuccess$ = this.socket.listen(EBoardActions.DeleteCardItemChecklistSuccess);
    this.deleteCardItemChecklistItemSuccess$ = this.socket.listen(EBoardActions.DeleteCardItemChecklistItemSuccess);
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

    let newData = {};

    if (data.mode !== undefined || data.colorLight !== undefined || data.colorDark !== undefined) {
      newData = {
        id: data.id,
        name: data.name,
        settings: {
          mode: data.mode,
          colorLight: data.colorLight,
          colorDark: data.colorDark
        }
      };
    } else {
      newData = {
        id: data.id,
        name: data.name
      };
    }

    this.socket.emit(EBoardActions.UpdateBoard, newData);
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

  getCardItem(data: {id: number}) {
    this.socket.emit(EBoardActions.GetCardItem, data);
    return this.getCardItemSuccess$;
  }

  addCardItem(data: {id: number, name: string}) {
    this.socket.emit(EBoardActions.AddCardItem, data);
    return this.addCardItemSuccess$;
  }

  addCardItemMember(data: {id: number, userId: number}) {
    this.socket.emit(EBoardActions.AddCardItemMember, data);
    return this.addCardItemMemberSuccess$;
  }

  addCardItemAttachment(data: {cardId: number, value: string}) {
    this.socket.emit(EBoardActions.AddCardItemAttachment, data);
    return this.addCardItemAttachmentSuccess$;
  }

  addCardItemChecklist(data: {id: number}) {
    this.socket.emit(EBoardActions.AddCardItemChecklist, data);
    return this.addCardItemChecklistSuccess$;
  }

  addCardItemChecklistItem(data: {id: number, checklistId: number}) {
    this.socket.emit(EBoardActions.AddCardItemChecklistItem, data);
    return this.addCardItemChecklistItemSuccess$;
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

  updateCardItemProperties(data: {id: number, name?: string, description?: string}) {
    this.socket.emit(EBoardActions.UpdateCardItemProperties, data);
    return this.updateCardItemProperties$;
  }

  updateCardItemDueDate(data: {id: number, dueDate: IDueDate}) {
    this.socket.emit(EBoardActions.UpdateCardItemDueDate, data);
    return this.updateCardItemDueDateSuccess$;
  }

  updateCardItemPriority(data: {id: number, priority: number}) {
    this.socket.emit(EBoardActions.UpdateCardItemPriority, data);
    return this.updateCardItemPrioritySuccess$;
  }

  updateCardItemAttachment(data: {id: number, cardId: number, name: string, value: string}) {
    this.socket.emit(EBoardActions.UpdateCardItemAttachment, data);
    return this.updateCardItemAttachmentSuccess$;
  }

  updateCardItemChecklist(data: {id: number, checklistId: number, name: string, hide: boolean}) {
    this.socket.emit(EBoardActions.UpdateCardItemChecklist, data);
    return this.updateCardItemChecklistSuccess$;
  }

  updateCardItemChecklistItem(data: {id: number, checkitemId: number, name: string, checked: boolean}) {
    this.socket.emit(EBoardActions.UpdateCardItemChecklistItem, data);
    return this.updateCardItemChecklistItemSuccess$;
  }

  deleteCardItem(data: {id: number}) {
    this.socket.emit(EBoardActions.DeleteCardItem, data);
    return this.deleteCardItemSuccess$;
  }

  deleteCardItemMember(data: {id: number, userId: number}) {
    this.socket.emit(EBoardActions.DeleteCardItemMember, data);
    return this.deleteCardItemMemberSuccess$;
  }

  deleteCardItemDueDate(data: {id: number}) {
    this.socket.emit(EBoardActions.DeleteCardItemDueDate, data);
    return this.deleteCardItemDueDateSuccess$;
  }

  deleteCardItemAttachment(data: {id: number, cardId: number}) {
    this.socket.emit(EBoardActions.DeleteCardItemAttachment, data);
    return this.deleteCardItemAttachmentSuccess$;
  }

  deleteCardItemChecklist(data: {id: number, checklistId: number}) {
    this.socket.emit(EBoardActions.DeleteCardItemChecklist, data);
    return this.deleteCardItemChecklistSuccess$;
  }

  deleteCardItemChecklistItem(data: {id: number, checkitemId: number}) {
    this.socket.emit(EBoardActions.DeleteCardItemChecklistItem, data);
    return this.deleteCardItemChecklistItemSuccess$;
  }

  archiveCardItem(data: {id: number}) {
    this.socket.emit(EBoardActions.ArchiveCardItem, data);
    return this.archiveCardItemSuccess$;
  }

  //#endregion

}
