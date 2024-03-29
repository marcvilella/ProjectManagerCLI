import { RouterReducerState } from '@ngrx/router-store';

import { ISocketState, initialSocketState } from './socket.state';
import { IUserState, initialUserState } from './user.state';
import { IMergeBoardState, initialMergeBoardState } from './board.state';
import { IMessageState, initialMessageState } from './message.state';

export interface IAppState {
      router?: RouterReducerState;
      socket: ISocketState;
      users: IUserState;
      boards: IMergeBoardState;
      messages: IMessageState;
}

export const initialAppState: IAppState = {
      socket: initialSocketState,
      users: initialUserState,
      boards: initialMergeBoardState,
      messages: initialMessageState
};

export function getInitialState(): IAppState {
      return initialAppState;
}
