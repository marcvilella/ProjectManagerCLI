import { IUser } from '../../models/user';

export interface IUserState{
      users: IUser[];
      selectedUser: IUser;
}

export const initialUserState: IUserState = {
      users: null,
      selectedUser: null
}