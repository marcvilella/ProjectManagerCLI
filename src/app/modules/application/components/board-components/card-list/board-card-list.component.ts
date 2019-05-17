import { Component, Input, Output, EventEmitter, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { moveItemInArray, transferArrayItem, CdkDragDrop} from '@angular/cdk/drag-drop';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { ICardList, ICardItem } from 'src/app/shared/models/boards';
import { AddCardItem, DeleteCardList, SortCardList } from 'src/app/shared/store/actions/board.actions';


@Component({
  selector: 'board-card-list',
  templateUrl: './board-card-list.component.html',
  styleUrls: ['../../../styles/board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardCardListComponent {

//#region Members

  @Input() index: number;
  @Input() list: ICardList;
  @Input() listTracker: number[];
  @Input() listNames: string[];

  @Input() loading: boolean;
  @Input() error: any;

  @Output() MoveListItems = new EventEmitter<{id: number, destinationId: number}>();
  @Output() PositionChanged = new EventEmitter<CdkDragDrop<ICardItem[]>>();

  isListTitleEditable: boolean;
  isNewCardAddible: boolean;
  listTitleFormControl: FormControl;
  newCardFormControl: FormControl;

//#endregion

//#region Constructor

  constructor(
    private _store: Store<IAppState>,
    private renderer2: Renderer2,
  ) {
    this.isListTitleEditable = false;
    this.isNewCardAddible = false;
    this.listTitleFormControl = new FormControl('', Validators.required);
    this.newCardFormControl = new FormControl('', Validators.required);
  }

  //#endregion

  //#region Functions

  ChangeListTitleState(): void {
    this.listTitleFormControl.setValue(this.list.name);
    this.isListTitleEditable = true;
  }

  updateListName(): void {
    if (this.listTitleFormControl.valid) {
        this.list.name = this.listTitleFormControl.value;
    }
    this.isListTitleEditable = false;
  }

  removeCardList(): void {
    this._store.dispatch(new DeleteCardList({id: this.list._id}));
  }

  sortBy(mode: number): void {
    this._store.dispatch(new SortCardList({id: this.list._id, mode: mode}));
  }

  moveListTo(index: number): void {
    this.MoveListItems.emit({id: this.list._id, destinationId: this.listTracker[index]});
  }

  //#endregion

  //#region Add New Card

  newCard(): void {
    this._store.dispatch(new AddCardItem({id: this.list._id, name: this.newCardFormControl.value, position: this.list.cards.length}));
    this.isNewCardAddible = false;
    this.newCardFormControl.reset();
  }

  cancelCard(): void {
    this.isNewCardAddible = false;
    this.newCardFormControl.reset();
  }

  //#endregion

  //#region Drag and Drop

  dropCard(event: CdkDragDrop<ICardItem[]>): void {
    this.PositionChanged.emit(event);
  }

  cardenter (event: MouseEvent): void {
    this.renderer2.addClass(event.target, 'mat-elevation-z5');
    this.renderer2.setStyle(event.target, 'background', 'rgb(224, 224, 224)');
  }

  cardleave (event: MouseEvent): void {
    this.renderer2.removeClass(event.target, 'mat-elevation-z5');
    this.renderer2.removeStyle(event.target, 'background');
  }

  //#endregion

}
