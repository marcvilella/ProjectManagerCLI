import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { selectBoardsById, selectSelectedCardLists, selectSelectedCardItems } from 'src/app/shared/store/selectors/board.selectors';
import { selectAllMessagesItems } from 'src/app/shared/store/selectors/message.selectors';
import { IBoard, ICardList, ICardItem } from 'src/app/shared/models/boards';
import { GetBoard } from 'src/app/shared/store/actions/board.actions';
import { IMessage } from 'src/app/shared/models/message';
import { MatDialog } from '@angular/material';
import { CardItemDialogContainerComponent } from '../card-item-dialog/board-card-item-dialog-container.component';
import { selectUsersByBoardId } from 'src/app/shared/store/selectors/user.selectors';
import { IUser } from 'src/app/shared/models/user';
import { GetUsersByBoard } from 'src/app/shared/store/actions/user.actions';

@Component({
  selector: 'board-container',
  templateUrl: './board.container.html'
})
export class BoardContainerComponent {

  board$: Observable<IBoard>;
  cardlists$: Observable<ICardList[]>;
  carditems$: Observable<ICardItem[]>;
  users$: Observable<IUser[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  currentBoardId: number;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _store: Store<IAppState>,
    public dialog: MatDialog
    ) {

    this.activeRoute.params.subscribe(params => {
      if (this.currentBoardId !== params.id) {
        this.currentBoardId = params.id;

        this._store.dispatch(new GetBoard({id: this.currentBoardId}));
        this._store.dispatch(new GetUsersByBoard({id: this.currentBoardId}));
        this.board$ = this._store.pipe(select(selectBoardsById(this.currentBoardId)));
        this.cardlists$ = this._store.pipe(select(selectSelectedCardLists));
        this.carditems$ = this._store.pipe(select(selectSelectedCardItems));
        this.users$ = this._store.pipe(select(selectUsersByBoardId(this.currentBoardId)));
      }

      if (params.card !== undefined) {
        this.dialog.open(CardItemDialogContainerComponent, {
          position: {top: '5vh'},
          width: '850px',
          panelClass: 'noborder-dialog-container',
          data: { id: params.card, users$: this.users$ }
        }).beforeClosed().subscribe(() => {
          // this.router.navigate(['.'], {
          //   relativeTo: this.activeRoute,
          //   queryParams: {id : this.currentBoardId},
          // });
          this.router.navigate(['../'], { relativeTo: this.activeRoute });
        });

      }
    });
  }

  getBoard() {
    return combineLatest(this.board$, this.cardlists$, this.carditems$, this.users$).pipe(map((result) => {
      if (result[0] === undefined) {
        return result[0];
      }

      if (result[3] !== undefined) {
        result[0].settings.users = result[3];

        result[2].forEach((cardItem) => {
          if (cardItem.users.length > 0) {
            const ids = cardItem.users.map(m => m._id);
            if (cardItem.users.some(m => m._id !== undefined && m.fullname === undefined)) {
                cardItem.users = result[3].filter(m => ids.some(n => n === m._id));
            }
      }
        });
      }

      result[1].forEach((cardList) => {
        if (cardList.cards.length > 0) {
          if (result[2].some(m => m.cardListId === cardList._id)) {
            cardList.cards =  result[2].filter(m => m.cardListId === cardList._id);
          }
        }
      });
      result[0].lists = result[1];

      return result[0];
    }));
  }

}
