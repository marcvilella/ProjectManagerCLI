import { Component, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { moveItemInArray, transferArrayItem, CdkDragDrop} from '@angular/cdk/drag-drop';

import { ICardList, ICard } from 'src/app/shared/models/boards';

@Component({
  selector: 'board-card-list',
  templateUrl: './board-card-list.component.html',
  styleUrls: ['../../../styles/board.component.scss']
})
export class BoardCardListComponent {

//#region Members

  @Input() index: number;
  @Input() list: ICardList;
  @Input() listTracker: string[];

  @Input() loading: boolean;
  @Input() error: any;

  @Output() refresh = new EventEmitter();

  isListTitleEditable: boolean;
  isNewCardAddible: boolean;
  listTitleFormControl: FormControl;
  newCardFormControl: FormControl;

//#endregion

//#region Constructor

  constructor(
    private renderer2: Renderer2, 
  ) {
    this.isListTitleEditable = false;
    this.isNewCardAddible = false;
    this.listTitleFormControl = new FormControl('', Validators.required);
    this.newCardFormControl = new FormControl('', Validators.required);
  }

//#endregion

//#region 

ChangeListTitleState(): void{
  this.listTitleFormControl.setValue(this.list.name);
  this.isListTitleEditable = true;
}

updateListName(): void{
  if(this.listTitleFormControl.valid)
      this.list.name = this.listTitleFormControl.value;
}

removeListCard(): void {
  // let listsArray = <FormArray>this.listsTitleForm.controls['lists'];
  // if (listsArray.length > 1) {
  //     listsArray.removeAt(index);
  // }
}

moveListTo(currentIndex: number, index: number): void{
  // this.board.lists[currentIndex].cards.forEach((card) => {
  //     this.board.lists[index].cards.push(card);
  // });
  // this.board.lists[currentIndex].cards = new Array<Card>();
}

//#endregion

//#region Add New Card

newCard(): void {  
  this.newCardFormControl.reset();
}

cancelCard(): void{
  this.isNewCardAddible = false;
  this.newCardFormControl.reset();
}

//#endregion

//#region Drag and Drop

dropCard(event: CdkDragDrop<ICard[]>): void {
  if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
      transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
  }
}

cardenter (event: MouseEvent): void {
  this.renderer2.addClass(event.target, 'mat-elevation-z5');
  this.renderer2.setStyle(event.target, 'background', 'rgb(224, 224, 224)') 
}

cardleave (event: MouseEvent): void {
  this.renderer2.removeClass(event.target, 'mat-elevation-z5')
  this.renderer2.removeStyle(event.target, 'background')
}

//#endregion

}