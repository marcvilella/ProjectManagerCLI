import { EBoardActions, BoardActions } from '../actions/board.actions';
import { IMergeBoardState, initialMergeBoardState, boardAdapter, cardListAdapter, cardItemAdapter } from '../state/board.state';
import { IBoard, ICardList, ICardItem, IAttachment, ICheckList } from '../../models/boards';
import swal from 'sweetalert';
import { IMessage } from '../../models/message';
import { IUser } from '../../models/user';

const executedActions: Array<{Action: BoardActions, State: IMergeBoardState, Payload: any}> = [];

function addExecutedAction(action: BoardActions, state: IMergeBoardState, payload: any): void {
      if (executedActions.push({Action: action, State: JSON.parse(JSON.stringify(state)), Payload: payload}) > 5) {
            executedActions.shift();
      }
}

function findExecutedAction(timestamp: any): {Action: BoardActions, State: IMergeBoardState, Payload: any} {
      for (let index = executedActions.length - 1; index >= 0; index--) {
            if (executedActions[index].Payload.timestamp === timestamp) {
                  return executedActions[index];
            }
      }

      return undefined;
}

function removeExecutedAction(action: string, payload: any): void {
      executedActions.splice(executedActions.findIndex(m => m.Action.type === action && m.Payload === payload));
}

function modifyExecutedAction(action: BoardActions, payload: any): void {
      for (let index = executedActions.length - 1 ; index >= 0; index--) {
            if (executedActions[index].Action.type === action.type && executedActions[index].Payload === null) {
                  executedActions[index].Payload = payload;
                  break;
            }
      }
}

export function addBoardTimestamp(action: string, timestamp: number) {
      for (let index = executedActions.length - 1 ; index >= 0; index--) {
            if (executedActions[index].Action.type === action) {
                  executedActions[index].Payload.timestamp = timestamp;
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

                  if (action.payload.error.timestamp !== undefined) {
                        const executedAction = findExecutedAction(action.payload.error.timestamp);

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
                  action.payload.cardItems.forEach((card: ICardItem) => {
                        card.createdAt = new Date(card.createdAt);
                        card.modifiedAt = new Date(card.modifiedAt);
                        if (card.dueDate !== undefined) {
                              if (card.dueDate.date !== undefined) {
                                    card.dueDate.date = new Date(card.dueDate.date);
                              }
                              if (card.dueDate.completedAt !== undefined) {
                                    card.dueDate.completedAt = new Date(card.dueDate.completedAt);
                              }
                        }
                        if (card.attachments !== undefined) {
                              card.attachments.forEach((attachment: IAttachment) => {
                                    attachment.date = new Date(attachment.date);
                                    let datatype = '';
                                    for (let i = 0; i < attachment.dataType.length; i++) {
                                          datatype = datatype + ' ' + attachment.dataType[i];
                                    }
                                    attachment.dataType = datatype;
                              });
                        }
                  });
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

            case EBoardActions.GetCardItemSuccess: {
                  action.payload.cardItem.createdAt = new Date(action.payload.cardItem.createdAt);
                  action.payload.cardItem.modifiedAt = new Date(action.payload.cardItem.modifiedAt);
                        if (action.payload.cardItem.dueDate !== undefined) {
                              if (action.payload.cardItem.dueDate.date !== undefined) {
                                    action.payload.cardItem.dueDate.date = new Date(action.payload.cardItem.dueDate.date);
                              }
                              if (action.payload.cardItem.dueDate.completedAt !== undefined) {
                                    action.payload.cardItem.dueDate.completedAt = new Date(action.payload.cardItem.dueDate.completedAt);
                              }
                        }
                        if (action.payload.cardItem.attachments !== undefined) {
                              action.payload.cardItem.attachments.forEach((attachment: IAttachment) => {
                                    attachment.date = new Date(attachment.date);
                                    let datatype = '';
                                    for (let i = 0; i < attachment.dataType.length; i++) {
                                          datatype = datatype + ' ' + attachment.dataType[i];
                                    }
                                    attachment.dataType = datatype;
                              });
                        }
                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.cardItem._id,
                                    changes: action.payload.cardItem
                              },
                              state.carditems
                        )
                  };
            }

            case EBoardActions.AddCardItemSuccess: {
                  action.payload.cardItem.createdAt = new Date(action.payload.cardItem.createdAt);
                  action.payload.cardItem.modifiedAt = new Date(action.payload.cardItem.modifiedAt);
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

            case EBoardActions.AddCardItemMemberSuccess: {
                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.id,
                                    changes: {
                                          users: [...state.carditems.entities[action.payload.id].users, <IUser>{_id: action.payload.userId}]
                                    }
                              },
                              state.carditems
                        )
                  };
            }

            case EBoardActions.AddCardItemAttachmentSuccess: {
                  action.payload.attachment.date = new Date(action.payload.attachment.date);
                  let datatype = '';
                  for (let i = 0; i < action.payload.attachment.dataType.length; i++) {
                        datatype = datatype + ' ' + action.payload.attachment.dataType[i];
                  }
                  action.payload.attachment.dataType = datatype;

                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.cardId,
                                    changes: {
                                          attachments: [...state.carditems.entities[action.payload.cardId].attachments, action.payload.attachment]
                                    }
                              },
                              state.carditems
                        )
                  };
            }

            case EBoardActions.AddCardItemChecklistSuccess: {
                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.id,
                                    changes: {
                                          checklists: [...state.carditems.entities[action.payload.id].checklists, action.payload.checklist]
                                    }
                              },
                              state.carditems
                        )
                  };
            }

            case EBoardActions.AddCardItemChecklistItemSuccess: {
                  const index = state.carditems.entities[action.payload.id].checklists.findIndex(m => m._id === action.payload.checklistId);
                  state.carditems.entities[action.payload.id].checklists[index].checkitems.push(action.payload.checkitem);

                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.id,
                                    changes: {}
                              },
                              state.carditems
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

            case EBoardActions.UpdateCardItemPropertiesSuccess: {
                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.id,
                                    changes: {
                                          name: action.payload.name,
                                          description: action.payload.description
                                    }
                              },
                              state.carditems
                        )
                  };
            }

            case EBoardActions.UpdateCardItemDueDateSuccess: {
                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.id,
                                    changes: {
                                          dueDate: {
                                                date: new Date(action.payload.dueDate.date),
                                                done: action.payload.dueDate.done,
                                                remindAt: action.payload.dueDate.remindAt,
                                                completedAt: action.payload.dueDate.completedAt !== undefined ? new Date(action.payload.dueDate.completedAt) : undefined
                                          }
                                    }
                              },
                              state.carditems
                        )
                  };
            }

            case EBoardActions.UpdateCardItemAttachmentSuccess: {
                  const index = state.carditems.entities[action.payload.cardId].attachments.findIndex(m => m._id === action.payload.id);
                  state.carditems.entities[action.payload.cardId].attachments[index].name = action.payload.name;
                  state.carditems.entities[action.payload.cardId].attachments[index].value = action.payload.value;
                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.cardId,
                                    changes: {}
                              },
                              state.carditems
                        )
                  };
            }

            case EBoardActions.UpdateCardItemChecklistSuccess: {
                  const index = state.carditems.entities[action.payload.id].checklists.findIndex(m => m._id === action.payload.checklistId);
                  state.carditems.entities[action.payload.id].checklists[index].name = action.payload.name;
                  state.carditems.entities[action.payload.id].checklists[index].hide = action.payload.hide;
                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.id,
                                    changes: {}
                              },
                              state.carditems
                        )
                  };
            }

            case EBoardActions.UpdateCardItemChecklistItemSuccess: {
                  state.carditems.entities[action.payload.id].checklists.forEach((checklist: ICheckList) => {
                        if (checklist.checkitems.some(m => m._id === action.payload.checkitemId)) {
                              const index = checklist.checkitems.findIndex(m => m._id === action.payload.checkitemId);
                              checklist.checkitems[index].name = action.payload.name;
                              checklist.checkitems[index].checked = action.payload.checked;
                        }
                  });
                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.id,
                                    changes: {}
                              },
                              state.carditems
                        )
                  };
            }

            case EBoardActions.UpdateCardItemPrioritySuccess: {
                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.id,
                                    changes: {
                                          priority: action.payload.priority
                                    }
                              },
                              state.carditems
                        )
                  };
            }

            case EBoardActions.DeleteCardItemSuccess: {
                  const cardlistId = state.carditems.entities[action.payload.id].cardListId;
                  return {
                        ...state,
                        cardlists: cardListAdapter.updateOne({
                              id: cardlistId,
                              changes: {
                                    cards: state.cardlists.entities[cardlistId].cards.filter(m => m._id !== action.payload.id)
                              }},
                              state.cardlists
                        ),
                        carditems: cardItemAdapter.removeOne(
                              action.payload.id,
                              state.carditems
                        )
                  };
            }

            case EBoardActions.DeleteCardItemMemberSuccess: {
                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.id,
                                    changes: {
                                          users: state.carditems.entities[action.payload.id].users.filter(m => m._id !== action.payload.userId)
                                    }
                              },
                              state.carditems
                        )
                  };
            }

            case EBoardActions.DeleteCardItemDueDateSuccess: {
                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.id,
                                    changes: {
                                          dueDate: undefined
                                    }
                              },
                              state.carditems
                        )
                  };
            }

            case EBoardActions.DeleteCardItemAttachmentSuccess: {
                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.cardId,
                                    changes: {
                                          attachments: state.carditems.entities[action.payload.cardId].attachments.filter(m => m._id !== action.payload.id)
                                    }
                              },
                              state.carditems
                        )
                  };
            }

            case EBoardActions.DeleteCardItemChecklistSuccess: {
                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.id,
                                    changes: {
                                          checklists: state.carditems.entities[action.payload.id].checklists.filter(m => m._id !== action.payload.checklistId)
                                    }
                              },
                              state.carditems
                        )
                  };
            }

            case EBoardActions.DeleteCardItemChecklistItemSuccess: {
                  state.carditems.entities[action.payload.id].checklists.forEach((checklist: ICheckList) => {
                        if (checklist.checkitems.some(m => m._id === action.payload.checkitemId)) {
                              checklist.checkitems = checklist.checkitems.filter(m => m._id !== action.payload.checkitemId);
                        }
                  });

                  return {
                        ...state,
                        carditems: cardItemAdapter.updateOne(
                              {
                                    id: action.payload.id,
                                    changes: {}
                              },
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
