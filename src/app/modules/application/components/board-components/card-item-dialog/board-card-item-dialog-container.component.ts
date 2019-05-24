import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { selectCardItemById } from 'src/app/shared/store/selectors/board.selectors';
import { selectMessagesByCardId } from 'src/app/shared/store/selectors/message.selectors';
import { ICardItem } from 'src/app/shared/models/boards';
import { GetCardItem } from 'src/app/shared/store/actions/board.actions';
import { IMessage } from 'src/app/shared/models/message';
import { IUser } from 'src/app/shared/models/user';
import { selectCurrentUser } from 'src/app/shared/store/selectors/user.selectors';

@Component({
  selector: 'board-card-item-dialog-container',
  templateUrl: './board-card-item-dialog-container.html'
})
export class CardItemDialogContainerComponent {
      selectedUser$: Observable<IUser>;

      card$: Observable<ICardItem>;
      comments$: Observable<IMessage[]>;

      constructor(
      private _store: Store<IAppState>,
      @Inject(MAT_DIALOG_DATA) public data: { id: number, users$: Observable<IUser[]> }
      ) {
            this._store.dispatch(new GetCardItem({id: data.id}));

            this.selectedUser$ = this._store.pipe(select(selectCurrentUser()));

            this.card$ = this._store.pipe(select(selectCardItemById(data.id)));
            this.comments$ = this._store.pipe(select(selectMessagesByCardId(data.id)));
      }

      getCard() {
            return combineLatest(this.card$, this.comments$, this.data.users$).pipe(map((result) => {
                  if (result[0] !== undefined) {
                        if (result[1] !== undefined && result[1].length > 0) {
                              result[0].messages = result[1];
                        }
                        if (result[2] !== undefined && result[0].users.length > 0) {
                              const ids = result[0].users.map(m => m._id);
                              if (result[0].users.some(m => m._id !== undefined && m.fullname === undefined)) {
                                    result[0].users = result[2].filter(m => ids.some(n => n === m._id));
                              }
                        }
                  }

                  return result[0];
            }));
      }
}
