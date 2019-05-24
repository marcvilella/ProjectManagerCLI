import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SocketService } from './socket.service';
import { EMessageActions } from '../store/actions/message.actions';

import { IMessage } from '../models/message';

@Injectable()
export class MessagesService {

  failure$: Observable<any>;
  getMessageSuccess$: Observable<IMessage>;
  getMessagesSuccess$: Observable<IMessage[]>;
  addMessageSuccess$: Observable<IMessage>;
  updateMessageSuccess$: Observable<{id: number, text: string}>;
  deleteMessageSuccess$: Observable<{id: number}>;

  constructor(private socket: SocketService) {
    this.getMessageSuccess$ = this.socket.listen(EMessageActions.GetMessageSuccess);
    this.getMessagesSuccess$ = this.socket.listen(EMessageActions.GetMessagesSuccess);
    this.addMessageSuccess$ = this.socket.listen(EMessageActions.AddMessageSuccess);
    this.updateMessageSuccess$ = this.socket.listen(EMessageActions.UpdateMessageSuccess);
    this.deleteMessageSuccess$ = this.socket.listen(EMessageActions.DeleteMessageSuccess);
  }

  getMessage(data: {id: number}) {
    this.socket.emit(EMessageActions.GetMessage, data);
    return this.getMessageSuccess$;
  }

  getMessages(data: {ids: number[]}) {
    this.socket.emit(EMessageActions.GetMessages, data);
    return this.getMessagesSuccess$;
  }

  addMessage(data: {cardId?: number, text: string}) {
    this.socket.emit(EMessageActions.AddMessage, data);
    return this.addMessageSuccess$;
  }

  updateMessage(data: {id: number, text: string}) {
    this.socket.emit(EMessageActions.UpdateMessage, data);
    return this.updateMessageSuccess$;
  }

  deleteMessage(data: {id: number}) {
    this.socket.emit(EMessageActions.DeleteMessage, data);
    return this.deleteMessageSuccess$;
  }

}
