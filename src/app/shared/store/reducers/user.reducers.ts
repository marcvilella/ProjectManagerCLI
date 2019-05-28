import { EUserActions, UserActions } from '../actions/user.actions';
import { userAdapter, IUserState, initialUserState } from '../state/user.state';
import { IUser } from '../../models/user';

export function userReducers (
      state: IUserState = initialUserState,
      action: UserActions
): IUserState {
      switch (action.type) {

            //#region Requests

            case EUserActions.GetCurrentUser:
            case EUserActions.GetUsersByBoard:
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

            //#region Get

            case EUserActions.GetUserSuccess: {
                  if (action.payload.name !== undefined && action.payload.surname !== undefined) {
                        action.payload.fullname = action.payload.name + ' ' + action.payload.surname;
                  }
                  return userAdapter.upsertOne(
                        action.payload,
                        {
                        ...state,
                        isLoading: false,
                        error: null
                  });
            }

            case EUserActions.GetCurrentUserSuccess: {
                  action.payload.fullname = action.payload.name + ' ' + action.payload.surname;
                  return userAdapter.upsertOne(
                        action.payload,
                        {
                        ...state,
                        selectedUserId: action.payload._id,
                        isLoading: false,
                        error: null
                  });
            }
            case EUserActions.GetUsersByBoardSuccess: {
                  action.payload.forEach((user: IUser) => {
                        if (user.name !== undefined && user.surname !== undefined) {
                              user.fullname = user.name + ' ' + user.surname;
                        }});
                  return userAdapter.upsertMany(
                        action.payload,
                        {
                        ...state,
                        isLoading: false,
                        error: null
                  });
            }

            //#endregion

            //#region Update

            case EUserActions.UpdateUserBoardPermissionSuccess: {
                  const index = state.entities[action.payload.userId].boards.findIndex(m => m._id === action.payload.id);
                  state.entities[action.payload.userId].boards[index].settings.role = action.payload.role;
                  return userAdapter.updateOne(
                        {
                              id: action.payload.id,
                              changes: {}
                        },
                        state
                  );
            }

            //#endregion

            default:
                  return state;
      }
}
