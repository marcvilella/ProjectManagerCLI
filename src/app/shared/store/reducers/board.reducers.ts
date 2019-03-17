import { EBoardActions, BoardActions } from '../actions/board.actions';
import { IBoardState, initialBoardState } from '../state/board.state';

export function boardReducers (
      state: IBoardState = initialBoardState,
      action : BoardActions
): IBoardState {
      switch(action.type){
            case EBoardActions.GetBoardsSuccess: {
                  return {
                        ...state,
                        boards: action.payload
                  };
            }
            case EBoardActions.GetBoardSuccess: {
                  return {
                        ...state,
                        boards: state.boards.map(
                              board => board._id === action.payload._id ? action.payload : board
                        ),
                        selectedBoard: action.payload
                  };
            }
            case EBoardActions.AddBoardSuccess: {
                  return {
                        ...state,
                        selectedBoard: action.payload
                  };
            }

            default:
                  return state;
      }
}