import { EMessageActions, MessageActions } from '../actions/message.actions';
import { messageAdapter, IMessageState, initialMessageState } from '../state/message.state';
import { IMessage } from '../../models/message';

export function messageReducers (
      state: IMessageState = initialMessageState,
      action: MessageActions
): IMessageState {
      switch (action.type) {

            //#region Failure

            case EMessageActions.Failure: {
                  return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                  };
            }

            //#endregion

            //#region Get

            case EMessageActions.GetMessageSuccess: {
                  action.payload.message.date = new Date(action.payload.message.date);

                  return messageAdapter.upsertOne(
                        action.payload.message,
                        {
                              ...state,
                              isLoading: false,
                              error: null
                        }
                  );
            }

            case EMessageActions.GetMessagesSuccess: {
                  action.payload.messages.forEach((message: IMessage) => {
                        message.date = new Date(message.date);
                  });
                  return messageAdapter.upsertMany(
                        action.payload.messages,
                        {
                              ...state,
                              isLoading: false,
                              error: null
                        }
                  );
            }

            //#endregion

            //#region Add

            case EMessageActions.AddMessageSuccess: {
                  action.payload.message.date = new Date(action.payload.message.date);

                  return messageAdapter.upsertOne(
                        action.payload.message,
                        {
                              ...state,
                              isLoading: false,
                              error: null
                        }
                  );
            }

            //#endregion

            //#region Update

            case EMessageActions.UpdateMessageSuccess: {
                  return messageAdapter.updateOne(
                        {
                              id: action.payload.id,
                              changes: {
                                    text: action.payload.text,
                                    edited: true
                              }
                        },
                        state
                  );
            }

            //#endregion

            //#region Delete

            case EMessageActions.DeleteMessageSuccess: {
                  return messageAdapter.removeOne(
                        action.payload.id,
                        state
                  );
            }

            //#endregion

            default:
                  return state;
      }
}
