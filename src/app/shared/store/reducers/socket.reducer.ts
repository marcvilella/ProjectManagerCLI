import { ESocketActions, SocketActions } from '../actions/socket.actions';
import { ISocketState, initialSocketState } from '../state/socket.state';

export function socketReducers (
      state: ISocketState = initialSocketState,
      action : SocketActions
): ISocketState {
      switch(action.type){
            case ESocketActions.SetSocketConnected: {
                  return {
                        ...state,
                        socketConnected: action.payload
                  };
            }

            default:
                  return state;
      }
}