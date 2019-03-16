import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ISocketState } from '../state/socket.state';

const selectSocket = (state: IAppState) => state.socket;

export const socketStatus = createSelector(
      selectSocket,
      (state: ISocketState) => state.socketConnected
)