import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { Store } from '@ngrx/store';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { ICardItem, ICheckList, ICheckItem } from 'src/app/shared/models/boards';
import { GetCardItem } from 'src/app/shared/store/actions/board.actions';


@Component({
    selector: 'board-card-item-dialog',
    templateUrl: './board-card-item-dialog.html',
    styleUrls: ['../../../styles/board.component.scss', '../../../styles/common.scss']
})
export class CardItemDialogComponent {

  //#region Members

  Card: ICardItem;

  IsChangingName: boolean;
  CardNameFormControl: FormControl;

  IsChangingDescription: boolean;
  CardDescriptionFormControl: FormControl;

  showTimeSheet: boolean;

  //#endregion

  //#region Constructor

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CardItemDialogComponent>,
    private _store: Store<IAppState>,
    @Inject(MAT_DIALOG_DATA) public data: { card: ICardItem }
    ) {

      this.Card = data.card;

      this.IsChangingName = false;
      this.CardNameFormControl = new FormControl(this.Card.name, Validators.required);

      this.IsChangingDescription = false;
      this.CardDescriptionFormControl = new FormControl(this.Card.name, Validators.required);

      this.showTimeSheet = true;
      this._store.dispatch(new GetCardItem({id: data.card._id}));
  }

  //#endregion

  //#region Functions - Name

  selectName(): void {
    this.IsChangingName = true;
    this.CardNameFormControl.setValue(this.Card.name);
  }

  updateName(): void {
    this.IsChangingName = false;
  }

  //#endregion

  //#region Functions - Due Date

  changeDueDate(): void {
  }

  setDueDate(event: MatCheckboxChange): void {
  }

  //#endregion

  //#region Functions - Description

  selectDescription(): void {
    this.IsChangingDescription = true;
    this.CardDescriptionFormControl.setValue(this.Card.name);
  }

  updateDescription(): void {
    this.IsChangingDescription = false;
  }

  //#endregion

  //#region Functions - Checklist

  addCheckList(): void {
    this.Card.checklists = new Array<ICheckList>();
    const checklist = {
      _id: 0,
      name: 'Checklist',
      checkitems: new Array<ICheckItem>(),
      hideCompleted: false
    };
    checklist.checkitems.push({
      _id: 1,
      name: 'A',
      checked: false,
      position: 0
    });
    checklist.checkitems.push({
      _id: 2,
      name: 'B',
      checked: false,
      position: 1
    });
    checklist.checkitems.push({
      _id: 3,
      name: 'C',
      checked: false,
      position: 2
    });
    this.Card.checklists.push(checklist);
  }

  //#endregion

}
