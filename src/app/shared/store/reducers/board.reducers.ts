import { EBoardActions, BoardActions } from '../actions/board.actions';
import { boardAdapter, IBoardState, initialBoardState } from '../state/board.state';
import { IBoard, ICardList } from '../../models/boards';

export function boardReducers (
      state: IBoardState = initialBoardState,
      action : BoardActions
): IBoardState {
      switch(action.type){

            //#region Requests

            case EBoardActions.GetBoards: 
            case EBoardActions.GetBoard:
            case EBoardActions.AddBoard:
            case EBoardActions.UpdateBoard:
            case EBoardActions.UpdateBoardStarred:{
                  return {
                  ...state,
                  isLoading: true,
                  error: null
                  };
            }

            //#endregion

            //#region Failure

            case EBoardActions.Failure:{
                  return {
                  ...state,
                  isLoading: false,
                  error: action.payload
                  };
            }

            //#endregion

            //#region Successes
            
            case EBoardActions.GetBoardsSuccess: {
                  return boardAdapter.upsertMany(
                        action.payload, 
                        {
                              ...state,
                              isLoading: false,
                              error: null
                        }
                  );
            }
            case EBoardActions.GetBoardSuccess: {
                  return boardAdapter.updateOne(
                        {
                              id: action.payload._id, 
                              changes: action.payload
                        }, 
                        {
                              ...state,
                              selectedBoardId: action.payload._id,
                              isLoading: false,
                              error: null
                        }
                  );
            }
            case EBoardActions.AddBoardSuccess: {
                  return boardAdapter.addOne(
                        action.payload,
                        {
                              ...state,
                              selectedBoardId: action.payload._id,
                              isLoading: false,
                              error: null
                        }
                  )
            }
            case EBoardActions.UpdateBoardSuccess: {      
            
                  action.payload.settings.starred = state.entities[action.payload._id].settings.starred;
                  
                  return boardAdapter.updateOne(
                        {
                              id: action.payload._id, 
                              changes: {
                                    name: action.payload.name,
                                    settings: action.payload.settings,
                                    modifiedAt: action.payload.modifiedAt
                              }
                        },
                        {
                              ...state,
                              isLoading: false,
                              error: null
                        }
                  );
            }
            case EBoardActions.UpdateBoardStarredSuccess: {
                  let board = state.entities[action.payload._id];
                  board.settings.starred = action.payload.settings.starred;
                  state.entities[action.payload._id] = board;
                  
                  return boardAdapter.updateOne(
                        {
                              id: action.payload._id, 
                              changes: {}
                        },
                        {
                              ...state,
                              isLoading: false,
                              error: null
                        }
                  );
            }

            //#endregion

            //#region Internal

            case EBoardActions.UpdateBoardsStarredInternal: {
                  action.payload.forEach(board => {
                        state.entities[board._id].settings.starred = board.settings.starred;
                  })
                  return boardAdapter.updateMany(
                        action.payload.map(board => Object.assign({}, {id: board._id, changes: {}})),
                        state
                  );
            }

            //#endregion

            default:
                  return state;
      }
}

export function cardlistReducers (
      state: ICardList[],
      action : BoardActions
){
      switch(action.type){
            case EBoardActions.AddBoard:{

            }

            default:
                  return state;
      }
}