import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IMessage } from '../../models/message';

export const messageAdapter: EntityAdapter<IMessage> = createEntityAdapter<IMessage>({
  selectId: message => message._id
});

export interface IMessageState extends EntityState<IMessage> {
      isLoading: boolean;
      error?: any;
}

export const initialMessageState: IMessageState = messageAdapter.getInitialState({
      isLoading: false,
      error: null
});
