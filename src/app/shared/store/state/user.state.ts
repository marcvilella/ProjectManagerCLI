import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IUser } from '../../models/user';

export const userAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({
  selectId: user => user._id
});

export interface IUserState extends EntityState<IUser>{
      selectedUserId: number | null;
      isLoading: boolean;
      error?: any;
}

export const initialUserState: IUserState = userAdapter.getInitialState({
      selectedUserId: null,
      isLoading: false,
      error: null
});