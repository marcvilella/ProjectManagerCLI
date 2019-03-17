import { Component } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { selectSelectedBoard } from 'src/app/shared/store/selectors/board.selectors';
import { IBoard } from 'src/app/shared/models/boards';

@Component({
  selector: 'board-container',
  templateUrl: './board.container.html'
})
export class BoardContainerComponent {
  board$: Observable<IBoard>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(private _store: Store<IAppState>) {
    this.board$ = this._store.pipe(select(selectSelectedBoard));
  }

}