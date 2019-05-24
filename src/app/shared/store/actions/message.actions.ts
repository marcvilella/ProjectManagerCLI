import { Action } from '@ngrx/store';

import { IMessage } from '../../models/message';

export enum EMessageActions {
      Failure = '[Message] Failure',
      GetMessage = '[Message] Get Message',
      GetMessageSuccess = '[Message] Get Message Success',
      GetMessages = '[Message] Get Messages',
      GetMessagesSuccess = '[Message] Get Messages Success',
      AddMessage = '[Message] Add Message',
      AddMessageSuccess = '[Message] Add Message Success',
      UpdateMessage = '[Message] Update Message',
      UpdateMessageSuccess = '[Message] Update Message Success',
      DeleteMessage = '[Message] Delete Message',
      DeleteMessageSuccess = '[Message] Delete Message Success'
}

//#region Failure

export class Failure implements Action {
      public readonly type = EMessageActions.Failure;
      constructor(public payload: any) {}
}

//#endregion

//#region Get

export class GetMessage implements Action {
      public readonly type = EMessageActions.GetMessage;
      constructor(public payload: {id: number}) {}
}

export class GetMessageSuccess implements Action {
      public readonly type = EMessageActions.GetMessageSuccess;
      constructor(public payload: {message: IMessage}) {}
}

export class GetMessages implements Action {
      public readonly type = EMessageActions.GetMessages;
      constructor(public payload: {ids: number[]}) {}
}

export class GetMessagesSuccess implements Action {
      public readonly type = EMessageActions.GetMessagesSuccess;
      constructor(public payload: {messages: IMessage[]}) {}
}

//#endregion

//#region Add

export class AddMessage implements Action {
      public readonly type = EMessageActions.AddMessage;
      constructor(public payload: {text: string, cardId?: number}) {}
}

export class AddMessageSuccess implements Action {
      public readonly type = EMessageActions.AddMessageSuccess;
      constructor(public payload: {message: IMessage}) {}
}

//#endregion

//#region Update

export class UpdateMessage implements Action {
      public readonly type = EMessageActions.UpdateMessage;
      constructor(public payload: {id: number, text: string}) {}
}

export class UpdateMessageSuccess implements Action {
      public readonly type = EMessageActions.UpdateMessageSuccess;
      constructor(public payload: {id: number, text: string}) {}
}

//#endregion

//#region Delete

export class DeleteMessage implements Action {
      public readonly type = EMessageActions.DeleteMessage;
      constructor(public payload: {id: number}) {}
}

export class DeleteMessageSuccess implements Action {
      public readonly type = EMessageActions.DeleteMessageSuccess;
      constructor(public payload: {id: number}) {}
}

//#endregion

export type MessageActions =
      | Failure
      | GetMessage            | GetMessageSuccess
      | GetMessages           | GetMessagesSuccess
      | AddMessage            | AddMessageSuccess
      | UpdateMessage         | UpdateMessageSuccess
      | DeleteMessage         | DeleteMessageSuccess
      ;
