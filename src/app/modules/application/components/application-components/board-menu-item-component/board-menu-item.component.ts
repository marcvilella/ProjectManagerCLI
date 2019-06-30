import { Component, Input, Output, EventEmitter, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Store } from '@ngrx/store';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { IBoard } from 'src/app/shared/models/boards';
import { UpdateBoardStarred, DeleteBoard } from 'src/app/shared/store/actions/board.actions';

@Component({
  selector: 'board-menu-item',
  templateUrl: './board-menu-item.component.html',
  styleUrls: ['../../../application.component.scss', '../../../styles/common.scss'],
  animations: [
    trigger('onConfigurationChange', [
      state('false',
        style({
          transform: 'translateX(100px)'
        })
      ),
      state('true',
        style({
          transform: 'none'
        })
      ),
      transition('false => true', animate('150ms ease-in')),
      transition('true => false', animate('250ms ease-in')),
    ])
  ]
})
export class BoardMenuItemComponent implements OnInit {

//#region Members

@Input() board: IBoard;
showConfiguration: boolean;
stylesObj: any;

//#endregion

//#region Constructor

constructor(
  private router: Router,
  private renderer2: Renderer2,
  private _store: Store<IAppState>
) {
  this.stylesObj = {
    'cursor': 'pointer',
    'transform': 'translateY(25%);',
    'margin': '0px 3px;',
    'height': '18px; ',
    'width': '18px;'
  };
}

ngOnInit() {
  this.showConfiguration = false;
}

//#endregion

//#region Functions

changeStarredStatus(): void {
  this._store.dispatch(new UpdateBoardStarred({id: this.board._id, starred: !this.board.settings.starred}));
}

archiveBoard(): void {
  this._store.dispatch(new DeleteBoard({id: this.board._id}));
}

//#endregion


//#region Enter and Out

cardenter (event: MouseEvent): void {
  this.showConfiguration = true;
  this.renderer2.addClass(event.target, 'mat-elevation-z5');
}

cardleave (event: MouseEvent): void {
  this.showConfiguration = false;
  this.renderer2.removeClass(event.target, 'mat-elevation-z5');
}

//#endregion

}
