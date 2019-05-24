import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { IAppState } from '../state/app.state';
import { socketReducers } from './socket.reducer';
import { userReducers } from '../reducers/user.reducers';
import { boardReducers } from '../reducers/board.reducers';
import { messageReducers } from './message.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
      router: routerReducer,
      socket: socketReducers,
      users: userReducers,
      boards: boardReducers,
      messages: messageReducers
};