import { EUserActions, UserActions } from '../actions/user.actions';
import { IUserState, initialUserState } from '../state/user.state';

export function userReducers (
      state: IUserState = initialUserState,
      action : UserActions
): IUserState {
      switch(action.type){
            case EUserActions.GetUsersSuccess: {
                  return {
                        ...state,
                        users: action.payload,
                        selectedUser: action.payload[0]
                  };
            }
            case EUserActions.GetUserSuccess: {
                  return {
                        ...state,
                        selectedUser: action.payload
                  };
            }

            default:
                  return state;
      }
}