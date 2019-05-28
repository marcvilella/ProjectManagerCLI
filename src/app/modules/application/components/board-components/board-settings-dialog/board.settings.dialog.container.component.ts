import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { selectBoardsById } from 'src/app/shared/store/selectors/board.selectors';
import { IBoard } from 'src/app/shared/models/boards';

@Component({
  selector: 'board-settings-dialog-container',
  templateUrl: './board.settings.dialog.container.html'
})
export class BoardSettingsDialogContainerComponent {

      board$: Observable<IBoard>;

      constructor(
            private _store: Store<IAppState>,
            @Inject(MAT_DIALOG_DATA) public data: { id: number }
      ) {
            this.board$ = this._store.pipe(select(selectBoardsById(this.data.id)));
      }

      getBoard() {
            return this.board$;
      }
}
