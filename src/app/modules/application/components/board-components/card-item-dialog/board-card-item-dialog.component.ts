import { Component, Inject, ViewEncapsulation, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { ICardItem, ICheckList, ICheckItem, IDueDate } from 'src/app/shared/models/boards';
import { UpdateCardItemDueDate, DeleteCardItemDueDate, UpdateCardItemPriority, UpdateCardItemProperties, AddCardItemMember, DeleteCardItemMember, DeleteCardItemChecklist, UpdateCardItemChecklist, AddCardItemChecklistItem, DeleteCardItemChecklistItem, UpdateCardItemChecklistItem, AddCardItemChecklist } from 'src/app/shared/store/actions/board.actions';
import { AddMessage } from 'src/app/shared/store/actions/message.actions';
import { IUser } from 'src/app/shared/models/user';


@Component({
    selector: 'board-card-item-dialog',
    templateUrl: './board-card-item-dialog.html',
    styleUrls: ['../../../styles/board.component.scss', '../../../styles/common.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CardItemDialogComponent {

  //#region Members

  @Input() selectedUser: IUser;
  @Input() users: IUser[];
  @Input() card: ICardItem;

  IsChangingName: boolean;
  CardNameFormControl: FormControl;

  IsChangingDescription: boolean;
  CardDescriptionFormControl: FormControl;

  commentFormControl: FormControl;

  showTimeSheet: boolean;

  mentionConfig: any = {
    mentions: [
        {
          items: ['Marc Vilella'],
          // items: this.data.card.users.map(m => m.fullname),
          triggerChar: '@'
        }
    ]
  };

  //#endregion

  //#region Constructor

  constructor(
    private _store: Store<IAppState>
    ) {
      this.IsChangingName = false;
      this.CardNameFormControl = new FormControl('', Validators.required);

      this.IsChangingDescription = false;
      this.CardDescriptionFormControl = new FormControl('', Validators.required);

      this.commentFormControl = new FormControl('', Validators.required);

      this.showTimeSheet = true;
  }

  //#endregion

  //#region Functions - Name / Description

  selectName(): void {
    this.IsChangingName = true;
    this.CardNameFormControl.setValue(this.card.name);
  }

  selectDescription(): void {
    this.IsChangingDescription = true;
    this.CardDescriptionFormControl.setValue(this.card.description);
  }

  updateProperties(): void {
    if (this.IsChangingName) {
      if (this.CardNameFormControl.valid && this.CardNameFormControl.value !== this.card.name) {
        this._store.dispatch(new UpdateCardItemProperties({id: this.card._id, name: this.CardNameFormControl.value, description: this.card.description}));
      }
    } else if (this.CardDescriptionFormControl.valid && this.CardDescriptionFormControl.value !== this.card.description) {
      this._store.dispatch(new UpdateCardItemProperties({id: this.card._id, name: this.card.name, description: this.CardDescriptionFormControl.value}));
    }

    this.IsChangingName = false;
    this.IsChangingDescription = false;
  }

  //#endregion

  //#region Functions - Members

  selectUser(event: number): void {
    this._store.dispatch(new AddCardItemMember({id: this.card._id, userId: event}));
  }

  deleteUser(event: number): void {
    this._store.dispatch(new DeleteCardItemMember({id: this.card._id, userId: event}));
  }

  //#endregion

  //#region Functions - Due Date

  changedDueDate(event: IDueDate): void {
    if (event !== undefined) {
      this._store.dispatch(new UpdateCardItemDueDate({id: this.card._id, dueDate: event}));
    } else {
      this._store.dispatch(new DeleteCardItemDueDate({id: this.card._id}));
    }
  }

  changedPriority(event: number): void {
    this._store.dispatch(new UpdateCardItemPriority({id: this.card._id, priority: event}));
  }

  //#endregion

  //#region Functions - Checklist

  addCheckList(): void {
    this._store.dispatch(new AddCardItemChecklist({id: this.card._id}));
  }

  updateChecklistProperties(event: {name: string, hide: boolean}, id: number): void {
    if (event === undefined) {
      this._store.dispatch(new DeleteCardItemChecklist({id: this.card._id, checklistId: id}));
    } else {
      this._store.dispatch(new UpdateCardItemChecklist({id: this.card._id, checklistId: id, name: event.name, hide: event.hide}));
    }
  }

  updateCheckitemProperties(event: {id: number, name?: string, checked?: boolean}, checklistId: number): void {
    console.log(event)
    if (event === undefined) {
      this._store.dispatch(new AddCardItemChecklistItem({id: this.card._id, checklistId: checklistId}));
    } else {
      if (event.name === undefined || event.checked === undefined) {
        this._store.dispatch(new DeleteCardItemChecklistItem({id: this.card._id, checkitemId: event.id}));
      } else {
        this._store.dispatch(new UpdateCardItemChecklistItem({id: this.card._id, checkitemId: event.id, name: event.name, checked: event.checked}));
      }
    }
  }

  //#endregion

    //#region Functions - Comments

    addComment(): void {
      this._store.dispatch(new AddMessage({cardId: this.card._id, text: this.commentFormControl.value}));
      this.commentFormControl.setValue('');
    }

    cancelComment(): void {
      this.commentFormControl.setValue('');
      console.log(this.card);
    }

    //#endregion

}
