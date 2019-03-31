import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { selectBoardsById, selectSelectedCardLists, selectSelectedCardItems } from 'src/app/shared/store/selectors/board.selectors';
import { IBoard, ICardList, ICardItem, Board } from 'src/app/shared/models/boards';
import { GetBoard } from 'src/app/shared/store/actions/board.actions';

@Component({
  selector: 'board-container',
  templateUrl: './board.container.html'
})
export class BoardContainerComponent {
  board$: Observable<IBoard>;
  cardlists$: Observable<ICardList[]>;
  carditems$: Observable<ICardItem[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private _store: Store<IAppState>
    ) {

    this.route.queryParams.subscribe(params => {
      const boardId = params.id;
      this._store.dispatch(new GetBoard({id: boardId}));
      this.board$ = this._store.pipe(select(selectBoardsById(boardId)));
      this.cardlists$ = this._store.pipe(select(selectSelectedCardLists));
      this.carditems$ = this._store.pipe(select(selectSelectedCardItems));
    });
  }

  getBoard() {
    return combineLatest(this.board$, this.cardlists$, this.carditems$).pipe(map((result) => {
      if (result[0] === undefined) {
        result[0] = new Board('');
      } else {
        result[1].forEach((cardList) => {
          if (cardList.cards.length > 0) {
            const cards = result[2].filter(m => m.cardListId === cardList._id);
            if (cards.length > 0) {
              cardList.cards = cards;
            }
          }
        });
        result[0].lists = result[1];
      }

      return result[0];
    }));
  }

}
