import { EUserActions, UserActions } from '../actions/user.actions';
import { userAdapter, IUserState, initialUserState } from '../state/user.state';

export function userReducers (
      state: IUserState = initialUserState,
      action: UserActions
): IUserState {
      switch (action.type) {

            //#region Requests

            case EUserActions.GetCurrentUser:
            case EUserActions.GetUsersFromBoard:
            case EUserActions.GetUser: {
                  return {
                    ...state,
                    isLoading: true,
                    error: null
                  };
            }

            //#endregion

            //#region Failure

            case EUserActions.Failure: {
                  return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                  };
            }

            //#endregion

            //#region Successes

            case EUserActions.GetCurrentUserSuccess: {
                  return userAdapter.upsertOne(
                        action.payload,
                        {
                        ...state,
                        selectedUserId: action.payload._id,
                        isLoading: false,
                        error: null
                  });
            }
            case EUserActions.GetUsersFromBoardSuccess: {
                  return userAdapter.upsertMany(
                        action.payload,
                        {
                        ...state,
                        isLoading: false,
                        error: null
                  });
            }
            case EUserActions.GetUserSuccess: {
                  return userAdapter.upsertOne(
                        action.payload,
                        {
                        ...state,
                        isLoading: false,
                        error: null
                  });
            }

            //#endregion

            default:
                  return state;
      }
}
