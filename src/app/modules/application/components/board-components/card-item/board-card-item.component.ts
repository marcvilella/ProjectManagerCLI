import { Component, Input, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ICardItem } from 'src/app/shared/models/boards';
import { CardItemDialogComponent } from '../card-item-dialog/board-card-item-dialog.component';

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
    private renderer2: Renderer2,
    public dialog: MatDialog
  ) {
    this.showEditable = false;
    this.isMenuOpen = false;
  }

  //#region Functions

  showCardContentDialog(): void {
    this.dialog.open(CardItemDialogComponent, {
      position: {top: '40px'},
      width: '850px',
      panelClass: 'form-dialog-container',
      data: { card: this.card }
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
