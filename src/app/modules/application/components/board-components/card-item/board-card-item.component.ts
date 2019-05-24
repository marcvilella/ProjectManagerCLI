import { Component, Input, Renderer2, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { CardItemDialogComponent } from '../card-item-dialog/board-card-item-dialog.component';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { ICardItem } from 'src/app/shared/models/boards';
import { DeleteCardItem } from 'src/app/shared/store/actions/board.actions';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'board-card-item',
  templateUrl: './board-card-item.component.html',
  styleUrls: ['../../../styles/board.component.scss']
})
export class BoardCardItemComponent {

  @Input() card: ICardItem;
  @Input() index: number;

  lastEvent: MouseEvent;
  showEditable: boolean;
  isMenuOpen: boolean;

  constructor(
    private _store: Store<IAppState>,
    private renderer2: Renderer2,
    public dialog: MatDialog,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.showEditable = false;
    this.isMenuOpen = false;
  }

  //#region Functions

  showCardContentDialog(): void {
    this.router.navigate(['.'], {
      relativeTo: this.activeRoute,
      queryParams: {card : this.card._id},
      queryParamsHandling: 'merge'
    });
  }

  stopPropagation($event: MouseEvent): void {
    $event.stopPropagation();
  }

  menuChanged(): void {
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.cardleave(this.lastEvent);
    }
  }

  //#endregion

  //#region Functions - Menu

  deleteCard(): void {
    this._store.dispatch(new DeleteCardItem({id: this.card._id}));
  }

  //#endregion

  //#region Moving in and out

  cardenter (event: MouseEvent): void {
    this.showEditable = true;
    this.lastEvent = event;
    this.renderer2.addClass(event.target, 'mat-elevation-z5');
    this.renderer2.setStyle(event.target, 'background', 'rgb(224, 224, 224)');
  }

  cardleave (event: MouseEvent): void {
    if (this.isMenuOpen) {
      return;
    }
    this.showEditable = false;
    this.renderer2.removeClass(event.target, 'mat-elevation-z5');
    this.renderer2.removeStyle(event.target, 'background');
  }

  //#endregion

}
