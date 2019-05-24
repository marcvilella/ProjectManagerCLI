import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { switchMap, map, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';

import { MessagesService } from '../../services/messages.service';
import { IAppState } from '../state/app.state';
import { IMessage } from '../../models/message';
import * as messageActions from '../actions/message.actions';

@Injectable()
export class MessageEffects {

      constructor(
            private _messagesService: MessagesService,
            private _actions$: Actions,
            private _store: Store<IAppState>
      ) {}

      //#region Get

      @Effect()
      getMessage$ = this._actions$.pipe(
            ofType<messageActions.GetMessage>(messageActions.EMessageActions.GetMessage),
            mergeMap((action) => this._messagesService.getMessage(action.payload)),
            switchMap((message: IMessage) => of(new messageActions.GetMessageSuccess({message: message})))
      );

      @Effect()
      getMessages$ = this._actions$.pipe(
            ofType<messageActions.GetMessages>(messageActions.EMessageActions.GetMessages),
            mergeMap((action) => this._messagesService.getMessages(action.payload)),
            switchMap((messages: IMessage[]) => of(new messageActions.GetMessagesSuccess({messages: messages})))
      );

      @Effect()
      getMessagesSuccess$: Observable<Action> = this._messagesService.getMessagesSuccess$.pipe(
            switchMap((messages: IMessage[]) => of(new messageActions.GetMessagesSuccess({messages: messages}))
      ));

      //#endregion

      //#region Add

      @Effect()
      addMessage$ = this._actions$.pipe(
            ofType<messageActions.AddMessage>(messageActions.EMessageActions.AddMessage),
            mergeMap((action) => this._messagesService.addMessage(action.payload)),
            switchMap((message: IMessage) => of(new messageActions.AddMessageSuccess({message: message})))
      );

      //#endregion

      //#region Update

      @Effect()
      updateMessage$ = this._actions$.pipe(
            ofType<messageActions.UpdateMessage>(messageActions.EMessageActions.UpdateMessage),
            mergeMap((action) => this._messagesService.updateMessage(action.payload)),
            switchMap((data: {id: number, text: string}) => of(new messageActions.UpdateMessageSuccess(data)))
      );

      //#endregion

      //#region Delete

      @Effect()
      deleteMessage$ = this._actions$.pipe(
            ofType<messageActions.DeleteMessage>(messageActions.EMessageActions.DeleteMessage),
            mergeMap((action) => this._messagesService.deleteMessage(action.payload)),
            switchMap((data: {id: number}) => of(new messageActions.DeleteMessageSuccess(data)))
      );

      //#endregion
}
