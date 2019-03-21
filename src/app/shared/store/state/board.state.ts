import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IBoard } from '../../models/boards';

export const boardAdapter: EntityAdapter<IBoard> = createEntityAdapter<IBoard>({
      selectId: board => board._id
    });

export interface IBoardState extends EntityState<IBoard>{
      selectedBoardId: number | null;
      isLoading: boolean;
      error?: any;
}

export const initialBoardState: IBoardState = boardAdapter.getInitialState({
      selectedBoardId: null,
      isLoading: false,
      error: null
})