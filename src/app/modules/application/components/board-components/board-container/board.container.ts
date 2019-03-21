import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { selectCurrentBoard, selectBoardsById } from 'src/app/shared/store/selectors/board.selectors';
import { IBoard } from 'src/app/shared/models/boards';
import { GetBoard } from 'src/app/shared/store/actions/board.actions';

@Component({
  selector: 'board-container',
  templateUrl: './board.container.html'
})
export class BoardContainerComponent {
  board$: Observable<IBoard>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private _store: Store<IAppState>
    ) {

    this.route.queryParams.subscribe(params => {
      let id = params.id;
      this._store.dispatch(new GetBoard(id));
      this.board$ = this._store.pipe(select(selectBoardsById(id)));
    });
  }

}