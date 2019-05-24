import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { userAdapter, IUserState } from '../state/user.state';
import { IUser } from '../../models/user';

//#region Members

const selectUserState = (state: IAppState) => state.users;

const entityAdapter = userAdapter.getSelectors();

const selectAllUserEntities = entityAdapter.selectEntities;
const selectAllUserItems = entityAdapter.selectAll;
const selectAllUserIds = entityAdapter.selectIds;

//#endregion

//#region State Selectors

export const selectUserError: MemoizedSelector<IAppState, any> = createSelector(
      selectUserState,
      (state: IUserState ): any => state.error
);

export const selectUserIsLoading: MemoizedSelector<IAppState, boolean> = createSelector(
      selectUserState,
      (state: IUserState): boolean => state.isLoading
);

//#endregion

//#region Entity Selectors

export const selectAllUsersItems = createSelector(
      selectUserState,
      selectAllUserItems
);

export const selectAllUsersEntities = createSelector(
      selectUserState,
      selectAllUserEntities
);

export const selectUserById = (id: number) => createSelector(
      selectAllUserItems,
      (allUsers: IUser[]) => {
      if (allUsers) {
            return allUsers.find(user => user._id === id);
      } else {
            return null;
      }
});

export const selectCurrentUserId: MemoizedSelector<IAppState, number> = createSelector(
      selectUserState,
      (state: IUserState) => state.selectedUserId
);

export const selectCurrentUser = () => createSelector(
      selectUserState,
      (state: IUserState) => {
            if (state.selectedUserId !== null) {
                  return state.entities[state.selectedUserId];
            }
      },
);

export const selectUsersByBoardId = (id: number) => createSelector(
      selectAllUsersItems,
      (users: IUser[]) => {
      if (users) {
            return users.filter(user => user.boards !== undefined && user.boards.some(m => m._id === id));
      } else {
            return null;
      }
});

//#endregion













