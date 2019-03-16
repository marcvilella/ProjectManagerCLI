import { RouterReducerState } from '@ngrx/router-store';

import { ISocketState, initialSocketState } from './socket.state';
import { IUserState, initialUserState } from './user.state';
import { IBoardState, initialBoardState } from './board.state';

export interface IAppState {
      router?: RouterReducerState;
      socket: ISocketState;
      users: IUserState;
      boards: IBoardState;
      // error: string;
}

export const initialAppState: IAppState = {
      socket: initialSocketState,
      users: initialUserState,
      boards: initialBoardState
      // error: null
}

export function getInitialState(): IAppState{
      return initialAppState;
}