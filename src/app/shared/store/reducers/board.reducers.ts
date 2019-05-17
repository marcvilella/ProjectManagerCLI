import { EBoardActions, BoardActions } from '../actions/board.actions';
import { IMergeBoardState, initialMergeBoardState, boardAdapter, cardListAdapter, cardItemAdapter } from '../state/board.state';
import { IBoard, ICardList, ICardItem } from '../../models/boards';
import swal from 'sweetalert';

const executedActions: Array<{Action: BoardActions, State: IMergeBoardState, Payload: any}> = [];

function addExecutedAction(action: BoardActions, state: IMergeBoardState, payload: any): void {
      if (executedActions.push({Action: action, State: JSON.parse(JSON.stringify(state)), Payload: payload}) > 5) {
            executedActions.shift();
      }
}

function findExecutedAction(action: string, payload: any): {Action: BoardActions, State: IMergeBoardState, Payload: any} {
      for (let index = executedActions.length - 1; index >= 0; index--) {
            if (executedActions[index].Action.type === action && executedActions[index].Payload.toString() === payload.toString()) {
                  return executedActions[index];
            }
      }

      return undefined;
}

function removeExecutedAction(action: string, payload: any): void {
      executedActions.splice(executedActions.findIndex(m => m.Action.type === action && m.Payload === payload));
}

function modifyExecutedAction(action: BoardActions, payload: any): void {
      let index = executedActions.length - 1;
      for ( ; index >= 0; index--) {
            if (executedActions[index].Action.type === action.type && executedActions[index].Payload === null) {
                  executedActions[index].Payload = payload;
                  break;
            }
      }
}

export function boardReducers (
      state: IMergeBoardState = initialMergeBoardState,
      action: BoardActions
): IMergeBoardState {
      switch (action.type) {

            //#region Requests

            case EBoardActions.GetBoards:
            case EBoardActions.GetBoard:
            case EBoardActions.AddBoard:
            case EBoardActions.UpdateBoard:
            case EBoardActions.UpdateBoardStarred:
            case EBoardActions.AddCardList: {
                  return {
                  ...state
                  // boards: boardAdapter.({}, {...state, error: null})
                  // ...error: null
                  // error: null
                  // ...state.boards.error,
                  // error: null
                  };
            }

            case EBoardActions.GetCardLists: {

                  state.cardlists.isLoading = true;
                  return {
                        ...state
                  };
            }

            //#endregion

            //#region Failure

            case EBoardActions.Failure: {
                  swal(action.payload.error.name, action.payload.error.message, 'error');

                  if (action.payload.error.backup !== undefined) {
                        const executedAction = findExecutedAction(action.payload.error.backup.action, action.payload.error.backup.params);

                        console.log(executedActions);
                        if (executedAction !== undefined) {
                              console.log('Recovery Found:');
                              console.log(executedAction);
                              return {
                                    ...executedAction.State
                              };
                        }
                  }

                  return {
                        ...state.boards.error,
                        error: action.payload
                  };
            }

            case EBoardActions.SaveBoardState: {
                  if (action.payload.data !== undefined) {
                        addExecutedAction(action.payload.action, state, action.payload.data);
                  } else {
                        addExecutedAction(action.payload.action, state, null);
                  }
                  return state;
            }

            //#endregion

            //#region Board

            case EBoardActions.GetBoardsSuccess: {
                  return {
                        ...state,
                        boards: boardAdapter.upsertMany(
                              action.payload.boards,
                              {
                                    ...state.boards,
                                    error: null
                              }
                        )
                  };
            }
            case EBoardActions.GetBoardSuccess: {
                  return {
                        ...state,
                        boards: boardAdapter.updateOne(
                              {
                                    id: action.payload.board._id,
                                    changes: action.payload.board
                              },
                              {
                                    ...state.boards,
                                    selectedBoardId: action.payload.board._id,
                                    error: null
                              }
                        )
                  };
            }

            case EBoardActions.AddBoardSuccess: {
                  return {
                        ...state,
                        boards: boardAdapter.addOne(
                              action.payload.board,
                              {
                                    ...state.boards,
                                    selectedBoardId: action.payload.board._id,
                                    error: null
                              }
                        )
                  };
            }
            case EBoardActions.UpdateBoardSuccess: {

                  action.payload.board.settings.starred = state.boards.entities[action.payload.board._id].settings.starred;

                  return {
                        ...state,
                        boards: boardAdapter.updateOne(
                              {
                                    id: action.payload.board._id,
                                    changes: {
                                          name: action.payload.board.name,
                                          settings: action.payload.board.settings,
                                          modifiedAt: action.payload.board.modifiedAt
                                    }
                              },
                              {
                                    ...state.boards,
                                    error: null
                              }
                        )
                  };
            }
            case EBoardActions.UpdateBoardStarredSuccess: {
                  state.boards.entities[action.payload.board._id].settings.starred = action.payload.board.settings.starred;

                  return {
                        ...state,
                        boards: boardAdapter.updateOne(
                              {
                                    id: action.payload.board._id,
                                    changes: {}
                              },
                              {
                                    ...state.boards,
                                    error: null
                              }
                        )
                  };
            }
            case EBoardActions.DeleteBoardSuccess: {
                  let cardlists: number[] = [];
                  if (state.boards.entities[action.payload.id].lists !== undefined) {
                        cardlists = state.boards.entities[action.payload.id].lists.map(m => m._id);
                  }
                  const carditems: number[] = [];
                  cardlists.forEach(listId => state.cardlists.entities[listId].cards.map(m => m._id)
                        .forEach(cardId => carditems.push(cardId)));

                  return {
                        ...state,
                        boards: boardAdapter.removeOne(
                              action.payload.id,
                              state.boards
                        ),
                        cardlists: cardListAdapter.removeMany(
                              cardlists,
                              state.cardlists
                        ),
                        carditems: cardItemAdapter.removeMany(
                              carditems,
                              state.carditems
                        )
                  };
            }

            //#endregion

            //#region Card List

            case EBoardActions.GetCardListsSuccess: {
                  return {
                        ...state,
                        cardlists: cardListAdapter.upsertMany(
                              action.payload.cardLists,
                              {
                                    ...state.cardlists,
                                    selectedCardListIds: action.payload.cardLists.map(cardList => cardList._id),
                                    error: null
                              }
                        )
                  };
            }
            case EBoardActions.AddCardListSuccess: {
                  return {
                        ...state,
                        boards: boardAdapter.updateOne(
                              {
                                    id: action.payload.cardList.boardId,
                                    changes: {lists: [...state.boards.entities[action.payload.cardList.boardId].lists,
                                          <ICardList>{_id: action.payload.cardList._id}]}
                              },
                              state.boards
                        ),
                        cardlists: cardListAdapter.upsertOne(
                              action.payload.cardList,
                              {
                                    ...state.cardlists,
                                    selectedCardListIds: [...state.cardlists.selectedCardListIds, action.payload.cardList._id],
                                    error: null
                              }
                        )
                  };
            }
            case EBoardActions.UpdateCardListPosition: {
                  modifyExecutedAction(action, action.payload);
                  return {
                        ...state,
                        cardlists: cardListAdapter.updateMany(
                              action.payload.cardLists.map(cardList => Object.assign({},
                                    {id: cardList._id, changes: {position: cardList.position}})),
                              state.cardlists
                        )
                  };
            }
            case EBoardActions.UpdateCardListPositionSuccess: {
                  removeExecutedAction(EBoardActions.UpdateCardListPosition, action.payload);
                  return {
                        ...state,
                        cardlists: cardListAdapter.updateMany(
                              action.payload.cardLists.map(cardList => Object.assign({},
                                    {id: cardList._id, changes: {position: cardList.position}})),
                              state.cardlists
                        )
                  };
            }
            case EBoardActions.MoveCardListItemsSuccess: {
                  return {
                        ...state,
                        cardlists: cardListAdapter.updateMany(
                              action.payload.cardLists.map(cardList => Object.assign({},
                                    {id: cardList._id, changes: {cards: cardList.cards.map(m => <ICardItem>{_id: m._id})}})),
                              state.cardlists
                        ),
                        carditems: cardItemAdapter.updateMany(
                              action.payload.cardLists[1].cards.map(cardItem => Object.assign({}, {
                                    id: cardItem._id, changes: {position: cardItem.position, cardListId: cardItem.cardListId}
                              })),
                              state.carditems
                        )
                  };
            }
            case EBoardActions.SortCardListSuccess: {
                  return {
                        ...state,
                        carditems: cardItemAdapter.updateMany(
                              action.payload.cardItems.map(cardItem => Object.assign({}, {
                                    id: cardItem._id, changes: {position: cardItem.position}
                              })),
                              state.carditems
                        )
                  };
            }
            case EBoardActions.DeleteCardList: {
                  addExecutedAction(action, state, action.payload);
                  return {
                        ...state,
                        carditems: cardItemAdapter.removeMany(
                              state.cardlists.entities[action.payload.id].cards.map(m => m._id),
                              state.carditems
                        ),
                        cardlists: cardListAdapter.removeOne(
                              action.payload.id,
                              state.cardlists
                        )
                  };
            }

            //#endregion

            //#region Card Item

            case EBoardActions.GetCardItemsSuccess: {
                  return {
                        ...state,
                        carditems: cardItemAdapter.upsertMany(
                              action.payload.cardItems,
                              {
                                    ...state.carditems,
                                    selectedCardItemIds: action.payload.cardItems.map(cardItem => cardItem._id),
                                    error: null
                              }
                        )
                  };
            }

            case EBoardActions.AddCardItemSuccess: {
                  return {
                        ...state,
                        cardlists: cardListAdapter.updateOne(
                              {
                                    id: action.payload.cardItem.cardListId,
                                    changes: {
                                          cards: [...state.cardlists.entities[action.payload.cardItem.cardListId].cards,
                                                <ICardItem>{_id: action.payload.cardItem._id}]
                                    }
                              },
                              state.cardlists
                        ),
                        carditems: cardItemAdapter.upsertOne(
                              action.payload.cardItem,
                              {
                                    ...state.carditems,
                                    selectedCardItemIds: [...state.carditems.selectedCardItemIds, action.payload.cardItem._id],
                                    error: null
                              }
                        )
                  };
            }

            case EBoardActions.UpdateCardItemPosition: {
                  modifyExecutedAction(action, action.payload);

                  if (action.payload.changedId !== undefined) {

                        state.cardlists = cardListAdapter.updateOne({
                                    id: action.payload.from.id,
                                    changes: {cards: action.payload.from.carditems.map(card => <ICardItem>{_id: card._id})}
                              },
                              state.cardlists
                        );

                        state.cardlists = cardListAdapter.updateOne({
                                    id: action.payload.to.id,
                                    changes: {cards: action.payload.to.carditems.map(card => <ICardItem>{_id: card._id})}
                              },
                              state.cardlists
                        );

                        state.carditems = cardItemAdapter.updateMany(
                              action.payload.from.carditems.map(cardItem => Object.assign({}, {
                                    id: cardItem._id, changes: {position: cardItem.position}
                              })),
                              state.carditems
                        );
                  }

                  return {
                        ...state,
                        carditems: cardItemAdapter.updateMany(
                              action.payload.to.carditems.map(cardItem => Object.assign({}, {
                                    id: cardItem._id, changes: {position: cardItem.position, cardListId: action.payload.to.id}
                              })),
                              state.carditems
                        )
                  };
            }

            //#endregion

            //#region Internal

            case EBoardActions.UpdateBoardsStarredInternal: {
                  action.payload.boards.forEach(board => {
                        state.boards.entities[board._id].settings.starred = board.settings.starred;
                  });
                  return {
                        ...state,
                        boards: boardAdapter.updateMany(
                              action.payload.boards.map(board => Object.assign({}, {id: board._id, changes: {}})),
                              state.boards
                        )
                  };
            }

            //#endregion

            default:
                  return state;
      }
}
