import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IBoard, ICardList, ICardItem } from '../../models/boards';

export interface IMergeBoardState {
      boards: IBoardState;
      cardlists: ICardListState;
      carditems: ICardItemState;
}

//#region Board

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

//#endregion

//#region Card List

export const cardListAdapter: EntityAdapter<ICardList> = createEntityAdapter<ICardList>({
      selectId: cardList => cardList._id
    });

export interface ICardListState extends EntityState<ICardList>{
      selectedCardListIds: number[];
      isLoading: boolean;
      error?: any;
}

export const initialCardListState: ICardListState = cardListAdapter.getInitialState({
      selectedCardListIds: [],
      isLoading: false,
      error: null
})

//#endregion

//#region Card Item

export const cardItemAdapter: EntityAdapter<ICardItem> = createEntityAdapter<ICardItem>({
      selectId: cardItem => cardItem._id
    });

export interface ICardItemState extends EntityState<ICardItem>{
      selectedCardItemIds: number[];
      isLoading: boolean;
      error?: any;
}

export const initialCardItemState: ICardItemState = cardItemAdapter.getInitialState({
      selectedCardItemIds: [],
      isLoading: false,
      error: null
})

//#endregion

export const initialMergeBoardState = {
      boards: initialBoardState,
      cardlists: initialCardListState,
      carditems: initialCardItemState
}