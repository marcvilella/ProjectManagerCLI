import { Action } from '@ngrx/store';

import { IBoard, ICardList, ICardItem, IDueDate, IAttachment, ICheckList, ICheckItem } from '../../models/boards';

export enum EBoardActions {
      Failure = '[Board] Failure',
      SaveBoardState = '[Board] Save State',

      GetBoards = '[Board] Get Boards',
      GetBoardsSuccess = '[Board] Get Boards Success',
      GetBoard = '[Board] Get Board',
      GetBoardSuccess = '[Board] Get Board Success',
      AddBoard = '[Board] Add Board',
      AddBoardSuccess = '[Board] Add Board Success',
      AddBoardMember = '[Board] Add Board Member',
      AddBoardMemberSuccess = '[Board] Add Board Member Success',
      UpdateBoard = '[Board] Update Board',
      UpdateBoardSuccess = '[Board] Update Board Success',
      UpdateBoardStarred = '[Board] Update Board Starred',
      UpdateBoardStarredSuccess = '[Board] Update Board Starred Success',
      UpdateBoardsStarredInternal = '[Board] Update Boards Starred Internal',
      DeleteBoard = '[Board] Delete Board',
      DeleteBoardSuccess = '[Board] Delete Board Success',
      DeleteBoardMember = '[Board] Delete Board Member',
      DeleteBoardMemberSuccess = '[Board] Delete Board Member Success',
      ArchiveBoard = '[Board] Archive Board',
      ArchiveBoardSuccess = '[Board] Archive Board Success',

      GetCardLists = '[Board] Get Card Lists',
      GetCardListsSuccess = '[Board] Get Card Lists Success',
      AddCardList = '[Board] Add Card List',
      AddCardListSuccess = '[Board] Add Card List Success',
      UpdateCardListPosition = '[Board] Update Card List Position',
      UpdateCardListPositionSuccess = '[Board] Update Card List Position Success',
      MoveCardListItems = '[Board] Move Card List Items',
      MoveCardListItemsSuccess = '[Board] Move Card List Items Success',
      SortCardList = '[Board] Sort Card List',
      SortCardListSuccess = '[Board] Sort Card List Success',
      DeleteCardList = '[Board] Delete Card List',
      DeleteCardListSuccess = '[Board] Delete Card List Success',
      ArchiveCardList = '[Board] Archive Card List',
      ArchiveCardListSuccess = '[Board] Archive Card List Success',

      GetCardItems = '[Board] Get Card Items',
      GetCardItemsSuccess = '[Board] Get Card Items Success',
      GetCardItem = '[Board] Get Card Item',
      GetCardItemSuccess = '[Board] Get Card Item Success',
      AddCardItem = '[Board] Add Card Item',
      AddCardItemSuccess = '[Board] Add Card Item Success',
      AddCardItemMember = '[Board] Add Card Item Member',
      AddCardItemMemberSuccess = '[Board] Add Card Item Member Success',
      AddCardItemAttachment = '[Board] Add Card Item Attachment',
      AddCardItemAttachmentSuccess = '[Board] Add Card Item Attachment Success',
      AddCardItemChecklist = '[Board] Add Card Item Checklist',
      AddCardItemChecklistSuccess = '[Board] Add Card Item Checklist Success',
      AddCardItemChecklistItem = '[Board] Add Card Item Checklist Item',
      AddCardItemChecklistItemSuccess = '[Board] Add Card Item Checklist Item Success',
      UpdateCardItemPosition = '[Board] Update Card Item Position',
      UpdateCardItemPositionSuccess = '[Board] Update Card Item Position Success',
      UpdateCardItemProperties = '[Board] Update Card Item Properties',
      UpdateCardItemPropertiesSuccess = '[Board] Update Card Item Properties Success',
      UpdateCardItemDueDate = '[Board] Update Card Item Due Date',
      UpdateCardItemDueDateSuccess = '[Board] Update Card Item Due Date Success',
      UpdateCardItemPriority = '[Board] Update Card Item Priority',
      UpdateCardItemPrioritySuccess = '[Board] Update Card Item Priority Success',
      UpdateCardItemAttachment = '[Board] Update Card Item Attachment',
      UpdateCardItemAttachmentSuccess = '[Board] Update Card Item Attachment Success',
      UpdateCardItemChecklist = '[Board] Update Card Item Checklist',
      UpdateCardItemChecklistSuccess = '[Board] Update Card Item Checklist Success',
      UpdateCardItemChecklistItem = '[Board] Update Card Item Checklist Item',
      UpdateCardItemChecklistItemSuccess = '[Board] Update Card Item Checklist Item Success',
      DeleteCardItem = '[Board] Delete Card Item',
      DeleteCardItemSuccess = '[Board] Delete Card Item Success',
      DeleteCardItemMember = '[Board] Delete Card Item Member',
      DeleteCardItemMemberSuccess = '[Board] Delete Card Item Member Success',
      DeleteCardItemDueDate = '[Board] Delete Card Item Due Date',
      DeleteCardItemDueDateSuccess = '[Board] Delete Card Item Due Date Success',
      DeleteCardItemAttachment = '[Board] Delete Card Item Attachment',
      DeleteCardItemAttachmentSuccess = '[Board] Delete Card Item Attachment Success',
      DeleteCardItemChecklist = '[Board] Delete Card Item Checklist',
      DeleteCardItemChecklistSuccess = '[Board] Delete Card Item Checklist Success',
      DeleteCardItemChecklistItem = '[Board] Delete Card Item Checklist Item',
      DeleteCardItemChecklistItemSuccess = '[Board] Delete Card Item Checklist Item Success',
      ArchiveCardItem = '[Board] Archive Card Item',
      ArchiveCardItemSuccess = '[Board] Archive Card Item Success',

}

//#region Failure

export class Failure implements Action {
      readonly type = EBoardActions.Failure;
      constructor(public payload: any) {}
}

export class SaveBoardState implements Action {
      readonly type = EBoardActions.SaveBoardState;
      constructor(public payload: {action: BoardActions, data?: any}) {}
}

//#endregion

//#region Board

export class GetBoards implements Action {
      public readonly type = EBoardActions.GetBoards;
}

export class GetBoardsSuccess implements Action {
      public readonly type = EBoardActions.GetBoardsSuccess;
      constructor(public payload: {boards: IBoard[]}) {}
}

export class GetBoard implements Action {
      public readonly type = EBoardActions.GetBoard;
      constructor(public payload: {id: number}) {}
}

export class GetBoardSuccess implements Action {
      public readonly type = EBoardActions.GetBoardSuccess;
      constructor(public payload: {board: IBoard}) {}
}

export class AddBoard implements Action {
      public readonly type = EBoardActions.AddBoard;
      constructor(public payload: {board: any}) {}
}

export class AddBoardSuccess implements Action {
      public readonly type = EBoardActions.AddBoardSuccess;
      constructor(public payload: {board: IBoard}) {}
}

export class AddBoardMember implements Action {
      public readonly type = EBoardActions.AddBoardMember;
      constructor(public payload: {id: number, userId: number}) {}
}

export class AddBoardMemberSuccess implements Action {
      public readonly type = EBoardActions.AddBoardMemberSuccess;
      constructor(public payload: {id: number, userId: number}) {}
}

export class UpdateBoard implements Action {
      public readonly type = EBoardActions.UpdateBoard;
      constructor(public payload: {id: number, name?: string}) {}
}

export class UpdateBoardSuccess implements Action {
      public readonly type = EBoardActions.UpdateBoardSuccess;
      constructor(public payload: {board: IBoard}) {}
}

export class UpdateBoardStarred implements Action {
      public readonly type = EBoardActions.UpdateBoardStarred;
      constructor(public payload: {id: number, starred: boolean}) {}
}

export class UpdateBoardStarredSuccess implements Action {
      public readonly type = EBoardActions.UpdateBoardStarredSuccess;
      constructor(public payload: {board: IBoard}) {}
}

export class DeleteBoard implements Action {
      public readonly type = EBoardActions.DeleteBoard;
      constructor(public payload: {id: number}) {}
}

export class DeleteBoardSuccess implements Action {
      public readonly type = EBoardActions.DeleteBoardSuccess;
      constructor(public payload: {id: number}) {}
}

export class DeleteBoardMember implements Action {
      public readonly type = EBoardActions.DeleteBoardMember;
      constructor(public payload: {id: number, userId: number}) {}
}

export class DeleteBoardMemberSuccess implements Action {
      public readonly type = EBoardActions.DeleteBoardMemberSuccess;
      constructor(public payload: {id: number, userId: number}) {}
}

export class ArchiveBoard implements Action {
      public readonly type = EBoardActions.ArchiveBoard;
      constructor(public payload: {id: number}) {}
}

export class ArchiveBoardSuccess implements Action {
      public readonly type = EBoardActions.ArchiveBoardSuccess;
      constructor(public payload: {id: number}) {}
}

//#region Internal Functions

export class UpdateBoardsStarredInternal implements Action {
      public readonly type = EBoardActions.UpdateBoardsStarredInternal;
      constructor(public payload: {boards: IBoard[]}) {}
}

//#endregion

//#endregion

//#region Card List

export class GetCardLists implements Action {
      public readonly type = EBoardActions.GetCardLists;
      constructor(public payload: {id: number}) {}
}

export class GetCardListsSuccess implements Action {
      public readonly type = EBoardActions.GetCardListsSuccess;
      constructor(public payload: {cardLists: ICardList[]}) {}
}

export class AddCardList implements Action {
      public readonly type = EBoardActions.AddCardList;
      constructor(public payload: {id: number, name: string, position: number}) {}
}

export class AddCardListSuccess implements Action {
      public readonly type = EBoardActions.AddCardListSuccess;
      constructor(public payload: {cardList: ICardList}) {}
}

export class UpdateCardListPosition implements Action {
      public readonly type = EBoardActions.UpdateCardListPosition;
      constructor(public payload: {cardLists: ICardList[]}) {}
}

export class UpdateCardListPositionSuccess implements Action {
      public readonly type = EBoardActions.UpdateCardListPositionSuccess;
      constructor(public payload: {cardLists: ICardList[]}) {}
}

export class MoveCardListItems implements Action {
      public readonly type = EBoardActions.MoveCardListItems;
      constructor(public payload: {id: number, destinationId: number}) {}
}

export class MoveCardListItemsSuccess implements Action {
      public readonly type = EBoardActions.MoveCardListItemsSuccess;
      constructor(public payload: {cardLists: ICardList[]}) {}
}

export class SortCardList implements Action {
      public readonly type = EBoardActions.SortCardList;
      constructor(public payload: {id: number, mode: number}) {}
}

export class SortCardListSuccess implements Action {
      public readonly type = EBoardActions.SortCardListSuccess;
      constructor(public payload: {cardItems: ICardItem[]}) {}
}

export class DeleteCardList implements Action {
      public readonly type = EBoardActions.DeleteCardList;
      constructor(public payload: {id: number}) {}
}

export class DeleteCardListSuccess implements Action {
      public readonly type = EBoardActions.DeleteCardListSuccess;
      constructor(public payload: {id: number}) {}
}

export class ArchiveCardList implements Action {
      public readonly type = EBoardActions.ArchiveCardList;
      constructor(public payload: {id: number}) {}
}

export class ArchiveCardListSuccess implements Action {
      public readonly type = EBoardActions.ArchiveCardListSuccess;
      constructor(public payload: {id: number}) {}
}

//#endregion

//#region  Card Item

export class GetCardItems implements Action {
      public readonly type = EBoardActions.GetCardItems;
      constructor(public payload: {id: number}) {}
}

export class GetCardItemsSuccess implements Action {
      public readonly type = EBoardActions.GetCardItemsSuccess;
      constructor(public payload: {cardItems: ICardItem[]}) {}
}

export class GetCardItem implements Action {
      public readonly type = EBoardActions.GetCardItem;
      constructor(public payload: {id: number}) {}
}

export class GetCardItemSuccess implements Action {
      public readonly type = EBoardActions.GetCardItemSuccess;
      constructor(public payload: {cardItem: ICardItem}) {}
}

export class AddCardItem implements Action {
      public readonly type = EBoardActions.AddCardItem;
      constructor(public payload: {id: number, name: string, position: number}) {}
}

export class AddCardItemSuccess implements Action {
      public readonly type = EBoardActions.AddCardItemSuccess;
      constructor(public payload: {cardItem: ICardItem}) {}
}

export class AddCardItemMember implements Action {
      public readonly type = EBoardActions.AddCardItemMember;
      constructor(public payload: {id: number, userId: number}) {}
}

export class AddCardItemMemberSuccess implements Action {
      public readonly type = EBoardActions.AddCardItemMemberSuccess;
      constructor(public payload: {id: number, userId: number}) {}
}

export class AddCardItemAttachment implements Action {
      public readonly type = EBoardActions.AddCardItemAttachment;
      constructor(public payload: {cardId: number, value: string}) {}
}

export class AddCardItemAttachmentSuccess implements Action {
      public readonly type = EBoardActions.AddCardItemAttachmentSuccess;
      constructor(public payload: {cardId: number, attachment: IAttachment}) {}
}

export class AddCardItemChecklist implements Action {
      public readonly type = EBoardActions.AddCardItemChecklist;
      constructor(public payload: {id: number}) {}
}

export class AddCardItemChecklistSuccess implements Action {
      public readonly type = EBoardActions.AddCardItemChecklistSuccess;
      constructor(public payload: {id: number, checklist: ICheckList}) {}
}

export class AddCardItemChecklistItem implements Action {
      public readonly type = EBoardActions.AddCardItemChecklistItem;
      constructor(public payload: {id: number, checklistId: number}) {}
}

export class AddCardItemChecklistItemSuccess implements Action {
      public readonly type = EBoardActions.AddCardItemChecklistItemSuccess;
      constructor(public payload: {id: number, checklistId: number, checkitem: ICheckItem}) {}
}


export class UpdateCardItemPosition implements Action {
      public readonly type = EBoardActions.UpdateCardItemPosition;
      constructor(public payload: {
            changedId?: number,
            from?: {id: number, carditems: ICardItem[]},
            to: {id: number, carditems: ICardItem[]}
      }) {}
}

export class UpdateCardItemPositionSuccess implements Action {
      public readonly type = EBoardActions.UpdateCardItemPositionSuccess;
      constructor(public payload: {id: number}) {}
}

export class UpdateCardItemProperties implements Action {
      public readonly type = EBoardActions.UpdateCardItemProperties;
      constructor(public payload: {id: number, name?: string, description?: string}) {}
}

export class UpdateCardItemPropertiesSuccess implements Action {
      public readonly type = EBoardActions.UpdateCardItemPropertiesSuccess;
      constructor(public payload: {id: number, name: string, description: string}) {}
}

export class UpdateCardItemPriority implements Action {
      public readonly type = EBoardActions.UpdateCardItemPriority;
      constructor(public payload: {id: number, priority: number}) {}
}

export class UpdateCardItemPrioritySuccess implements Action {
      public readonly type = EBoardActions.UpdateCardItemPrioritySuccess;
      constructor(public payload: {id: number, priority: number}) {}
}

export class UpdateCardItemDueDate implements Action {
      public readonly type = EBoardActions.UpdateCardItemDueDate;
      constructor(public payload: {id: number, dueDate: IDueDate}) {}
}

export class UpdateCardItemDueDateSuccess implements Action {
      public readonly type = EBoardActions.UpdateCardItemDueDateSuccess;
      constructor(public payload: {id: number, dueDate: IDueDate}) {}
}

export class UpdateCardItemAttachment implements Action {
      public readonly type = EBoardActions.UpdateCardItemAttachment;
      constructor(public payload: {id: number, cardId: number, name: string, value: string}) {}
}

export class UpdateCardItemAttachmentSuccess implements Action {
      public readonly type = EBoardActions.UpdateCardItemAttachmentSuccess;
      constructor(public payload: {id: number, cardId: number, name: string, value: string}) {}
}

export class UpdateCardItemChecklist implements Action {
      public readonly type = EBoardActions.UpdateCardItemChecklist;
      constructor(public payload: {id: number, checklistId: number, name: string, hide: boolean}) {}
}

export class UpdateCardItemChecklistSuccess implements Action {
      public readonly type = EBoardActions.UpdateCardItemChecklistSuccess;
      constructor(public payload: {id: number, checklistId: number, name: string, hide: boolean}) {}
}

export class UpdateCardItemChecklistItem implements Action {
      public readonly type = EBoardActions.UpdateCardItemChecklistItem;
      constructor(public payload: {id: number, checkitemId: number, name: string, checked: boolean}) {}
}

export class UpdateCardItemChecklistItemSuccess implements Action {
      public readonly type = EBoardActions.UpdateCardItemChecklistItemSuccess;
      constructor(public payload: {id: number, checkitemId: number, name: string, checked: boolean}) {}
}

export class DeleteCardItem implements Action {
      public readonly type = EBoardActions.DeleteCardItem;
      constructor(public payload: {id: number}) {}
}

export class DeleteCardItemSuccess implements Action {
      public readonly type = EBoardActions.DeleteCardItemSuccess;
      constructor(public payload: {id: number}) {}
}

export class DeleteCardItemMember implements Action {
      public readonly type = EBoardActions.DeleteCardItemMember;
      constructor(public payload: {id: number, userId: number}) {}
}

export class DeleteCardItemMemberSuccess implements Action {
      public readonly type = EBoardActions.DeleteCardItemMemberSuccess;
      constructor(public payload: {id: number, userId: number}) {}
}

export class DeleteCardItemDueDate implements Action {
      public readonly type = EBoardActions.DeleteCardItemDueDate;
      constructor(public payload: {id: number}) {}
}

export class DeleteCardItemDueDateSuccess implements Action {
      public readonly type = EBoardActions.DeleteCardItemDueDateSuccess;
      constructor(public payload: {id: number}) {}
}

export class DeleteCardItemAttachment implements Action {
      public readonly type = EBoardActions.DeleteCardItemAttachment;
      constructor(public payload: {id: number, cardId: number}) {}
}

export class DeleteCardItemAttachmentSuccess implements Action {
      public readonly type = EBoardActions.DeleteCardItemAttachmentSuccess;
      constructor(public payload: {id: number, cardId: number}) {}
}

export class DeleteCardItemChecklist implements Action {
      public readonly type = EBoardActions.DeleteCardItemChecklist;
      constructor(public payload: {id: number, checklistId: number}) {}
}

export class DeleteCardItemChecklistSuccess implements Action {
      public readonly type = EBoardActions.DeleteCardItemChecklistSuccess;
      constructor(public payload: {id: number, checklistId: number}) {}
}

export class DeleteCardItemChecklistItem implements Action {
      public readonly type = EBoardActions.DeleteCardItemChecklistItem;
      constructor(public payload: {id: number, checkitemId: number}) {}
}

export class DeleteCardItemChecklistItemSuccess implements Action {
      public readonly type = EBoardActions.DeleteCardItemChecklistItemSuccess;
      constructor(public payload: {id: number, checkitemId: number}) {}
}

export class ArchiveCardItem implements Action {
      public readonly type = EBoardActions.ArchiveCardItem;
      constructor(public payload: {id: number}) {}
}

export class ArchiveCardItemSuccess implements Action {
      public readonly type = EBoardActions.ArchiveCardItemSuccess;
      constructor(public payload: {id: number}) {}
}

//#endregion

export type BoardActions =
      | Failure                     | SaveBoardState

      | GetBoards                   | GetBoardsSuccess
      | GetBoard                    | GetBoardSuccess
      | AddBoard                    | AddBoardSuccess
      | AddBoardMember              | AddBoardMemberSuccess
      | UpdateBoard                 | UpdateBoardSuccess
      | UpdateBoardStarred          | UpdateBoardStarredSuccess
      | UpdateBoardsStarredInternal
      | DeleteBoard                 | DeleteBoardSuccess
      | DeleteBoardMember           | DeleteBoardMemberSuccess
      | ArchiveBoard                | ArchiveBoardSuccess

      | GetCardLists                | GetCardListsSuccess
      | AddCardList                 | AddCardListSuccess
      | UpdateCardListPosition      | UpdateCardListPositionSuccess
      | MoveCardListItems           | MoveCardListItemsSuccess
      | SortCardList                | SortCardListSuccess
      | DeleteCardList              | DeleteCardListSuccess
      | ArchiveCardList             | ArchiveCardListSuccess

      | GetCardItems                | GetCardItemsSuccess
      | GetCardItem                 | GetCardItemSuccess
      | AddCardItem                 | AddCardItemSuccess
      | AddCardItemMember           | AddCardItemMemberSuccess
      | AddCardItemAttachment       | AddCardItemAttachmentSuccess
      | AddCardItemChecklist        | AddCardItemChecklistSuccess
      | AddCardItemChecklistItem    | AddCardItemChecklistItemSuccess
      | UpdateCardItemPosition      | UpdateCardItemPositionSuccess
      | UpdateCardItemProperties    | UpdateCardItemPropertiesSuccess
      | UpdateCardItemDueDate       | UpdateCardItemDueDateSuccess
      | UpdateCardItemPriority      | UpdateCardItemPrioritySuccess
      | UpdateCardItemAttachment    | UpdateCardItemAttachmentSuccess
      | UpdateCardItemChecklist     | UpdateCardItemChecklistSuccess
      | UpdateCardItemChecklistItem | UpdateCardItemChecklistItemSuccess
      | DeleteCardItem              | DeleteCardItemSuccess
      | DeleteCardItemMember        | DeleteCardItemMemberSuccess
      | DeleteCardItemDueDate       | DeleteCardItemDueDateSuccess
      | DeleteCardItemAttachment    | DeleteCardItemAttachmentSuccess
      | DeleteCardItemChecklist     | DeleteCardItemChecklistSuccess
      | DeleteCardItemChecklistItem | DeleteCardItemChecklistItemSuccess
      | ArchiveCardItem             | ArchiveCardItemSuccess
;
