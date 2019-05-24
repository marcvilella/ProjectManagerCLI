import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { messageAdapter, IMessageState } from '../state/message.state';
import { IMessage } from '../../models/message';

//#region Members

const selectMessageState = (state: IAppState) => state.messages;

const entityAdapter = messageAdapter.getSelectors();

const selectAllMessageEntities = entityAdapter.selectEntities;
const selectAllMessageItems = entityAdapter.selectAll;
const selectAllMessageIds = entityAdapter.selectIds;

//#endregion

//#region State Selectors

export const selectMessageError: MemoizedSelector<IAppState, any> = createSelector(
      selectMessageState,
      (state: IMessageState ): any => state.error
);

export const selectMessageIsLoading: MemoizedSelector<IAppState, boolean> = createSelector(
      selectMessageState,
      (state: IMessageState): boolean => state.isLoading
);

//#endregion

//#region Entity Selectors

export const selectAllMessagesItems = createSelector(
      selectMessageState,
      selectAllMessageItems
)

export const selectAllMessagesEntities = createSelector(
      selectMessageState,
      selectAllMessageEntities
)

export const selectMessageById = (id: number) => createSelector(
      selectAllMessagesItems,
      (messages: IMessage[]) => {
      if (messages) {
            return messages.find(message => message._id === id);
      } else {
            return null;
      }
});

export const selectMessagesByCardId = (id: number) => createSelector(
      selectAllMessagesItems,
      (messages: IMessage[]) => {
      if (messages) {
            return messages.filter(message => message.cardId !== undefined && message.cardId === id);
      } else {
            return null;
      }
});

//#endregion













