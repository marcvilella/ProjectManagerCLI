import { Component, Input, Renderer2, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { ICardItem, ICheckItem, ICheckList } from 'src/app/shared/models/boards';
import { DeleteCardItem } from 'src/app/shared/store/actions/board.actions';
import { IPriority, priorities } from 'src/app/shared/models/priorities';

@Component({
  selector: 'board-card-item',
  templateUrl: './board-card-item.component.html',
  styleUrls: ['../../../styles/board.component.scss', '../../../styles/common.scss']
})
export class BoardCardItemComponent implements OnChanges {

  @Input() card: ICardItem;
  @Input() index: number;

  priorities: IPriority[];

  showEditable: boolean;
  lastEvent: MouseEvent;
  isMenuOpen: boolean;

  dueDateColor: string;
  checkitemsColor: string;
  checkitemsStat: string;

  constructor(
    private _store: Store<IAppState>,
    private renderer2: Renderer2
  ) {
    this.showEditable = false;
    this.isMenuOpen = false;
    this.dueDateColor = 'transparent';
    this.checkitemsColor = 'transparent';
    this.priorities = priorities;
  }

  ngOnChanges(changes: any) {
    if (this.card.dueDate !== undefined && this.card.dueDate.date !== undefined) {
      if (this.card.dueDate.done) {
        this.dueDateColor = 'green';
      } else if (this.card.dueDate.date < moment().toDate()) {
              this.dueDateColor = 'red';
      } else {
              this.dueDateColor = 'transparent';
      }
    }
    if (this.card.checklists !== undefined) {
      let checked = 0, total = 0;
      this.card.checklists.forEach((checklist: ICheckList) => checklist.checkitems.forEach((checkitem: ICheckItem) => {
        if (checkitem.checked) {
          checked++;
        }
        total++;
      }));
      this.checkitemsStat = checked + '/' + total;
      if (checked === total) {
        this.checkitemsColor = 'green';
      } else {
        this.checkitemsColor = 'transparent';
      }
    }
  }

  //#region Functions

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
