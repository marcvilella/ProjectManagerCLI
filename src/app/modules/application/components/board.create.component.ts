import { Component, ChangeDetectorRef, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { IColor, Colors } from '../../../shared/models/colors';
import { AddBoard } from 'src/app/shared/store/actions/board.actions';
import { IBoard } from 'src/app/shared/models/boards';
import { IUser } from 'src/app/shared/models/user';
import { selectSelectedUser } from 'src/app/shared/store/selectors/user.selectors';

@Component({
    selector: 'board-create',
    templateUrl: '../views/board.create.html',
    styleUrls: ['../application.component.scss']
})
export class BoardCreateDialog {

  //#region Members

  user: IUser;
  boardTitleFormControl: FormControl;
  privacyMode: string;
  listColors: IColor[];
  selectedColor: IColor;

  //#endregion

  //#region Constructor

  constructor(
    public dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<BoardCreateDialog>,
    private _store: Store<IAppState>,
    private boardData: BoardCreateDataService) {

      
      let board = this.dialog.open(BoardCardDialog, {
        position: {top: '370px'},
        panelClass: 'noborder-dialog-container',
        hasBackdrop: false,
        autoFocus: false
      });

      this.dialogRef.beforeClosed().subscribe(() => {
        board.close()
      })

      this._store.pipe(select(selectSelectedUser)).subscribe((user: IUser) => this.user = user);
      this.boardTitleFormControl = new FormControl('');
      this.privacyMode = 'private';
      this.listColors = Colors;
      this.selectedColor = this.listColors[0];

  }

  //#endregion

  titleChanged(): void{
    this.boardData.changeTitle(this.boardTitleFormControl.value);
  }

  colorChanged(color: IColor): void{
    this.selectedColor = color;
    this.boardData.changeColor(this.selectedColor);//this.colors.find(m => m.colorLight == color));
  }

  isColorSelected(color: IColor): boolean{
    if(color == this.selectedColor)
      return true;
    else
      return false;
  }

  modeChanged(): void{
    this.changeDetectorRef.detectChanges();
    this.boardData.changeMode(this.privacyMode);
  }

  createBoard(): void {
    if(this.boardTitleFormControl.value != ''){
      //this.dialogRef.close();
      let users: number[] = [this.user._id];
      
      let params = {
        name: this.boardTitleFormControl.value,
        settings: {
          mode: this.privacyMode,
          color: this.selectedColor,
          users: users
        }
      };
      
      console.log(params)

      this._store.dispatch(new AddBoard(params));
    }
  }
    
}

@Component({
  selector: 'board-card-dialog',
  template: `
  <div fxLayout="row" class="create-board"> 
    <div [style.background]="color.colorDark" class="darkComponent">
      <mat-icon *ngIf="mode == 'private'" svgIcon="private"></mat-icon>
      <mat-icon *ngIf="mode == 'shared'" svgIcon="shared"></mat-icon>
    </div>
    <div [style.background]="color.colorLight" class="lightComponent">
      {{title}}
    </div> 
  </div>`,
  styleUrls: ['../application.component.scss']
})
export class BoardCardDialog {

  title: string;
  color: IColor;
  mode: string;

  constructor(private boardData: BoardCreateDataService) {

    this.title = '';
    this.color =  null;
    this.mode = '';

    this.boardData.Title.subscribe(message => this.title = message);
    this.boardData.Color.subscribe(message => this.color = message);
    this.boardData.Mode.subscribe(message => this.mode = message);

  }
  
}


@Injectable()
export class BoardCreateDataService {

  private defaultColor: IColor =  Colors[0];

  private titleSource = new BehaviorSubject('Board title...');
  Title = this.titleSource.asObservable();
  private colorSource = new BehaviorSubject(this.defaultColor);
  Color = this.colorSource.asObservable();
  private modeSource = new BehaviorSubject('private');
  Mode = this.modeSource.asObservable();

  constructor() { }

  changeTitle(title: string) {
    this.titleSource.next(title)
  }

  changeColor(color: IColor) {
    this.colorSource.next(color)
  }

  changeMode(mode: string) {
    if(mode === '')
      this.modeSource.next('Board title...');
    else
      this.modeSource.next(mode)
  }

}