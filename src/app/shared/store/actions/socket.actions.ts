import { Action } from '@ngrx/store';

export enum ESocketActions {
      SetSocketConnected = '[Socket] Set Socket Connected'
}

export class SetSocketConnected implements Action {
      public readonly type = ESocketActions.SetSocketConnected;
      constructor(public payload?: boolean) {}
}

export type SocketActions = 
      | SetSocketConnected 
      ;