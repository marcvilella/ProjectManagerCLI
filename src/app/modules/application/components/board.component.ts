import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { moveItemInArray, transferArrayItem, CdkDragDrop} from '@angular/cdk/drag-drop';
import { CardList, Card, Board } from 'src/app/shared/models/boards';
import { ComponentSocketService } from 'src/app/shared/services/component.socket.service';

@Component({
    selector: 'board',
    templateUrl: '../views/board.html',
    styleUrls: ['../application.component.scss', '../../../app.component.scss'], 
})
export class BoardComponent{

    //#region Properties  
    settings: boolean;

    isBoardTitleEditable: boolean;
    isTitleEditable: boolean;
    isNewTitleEditable:boolean;

    CurrentItem: number;
    CurrentList: number;

    board: Board;

    //#endregion

    //#region FormControls
    boardTitleForm: FormControl;
    listsTitleForm: FormGroup;
    newTitleFormControl: FormControl;
    newCardFormControl: FormControl;
    //#endregion
    
    //#region Constructor
    
    constructor(
        private router: Router, 
        public translate: TranslateService, 
        private renderer2: Renderer2, 
        private formBuilder: FormBuilder) 
        //private socketService: ComponentSocketService) 
        {
            this.settings = false;
            this.isBoardTitleEditable = false;
            this.isTitleEditable = false;
            this.isNewTitleEditable = false;

            this.listsTitleForm= this.formBuilder.group({
                lists: this.formBuilder.array([])
            });

            this.testingCreate();

            this.boardTitleForm = new FormControl(this.board.name, Validators.required);
            this.newTitleFormControl = new FormControl('', Validators.required);
            this.newCardFormControl = new FormControl('', Validators.required);

            
            
            // this.socketService.initSocket();

            // this.socketService.onMessage('message1').subscribe((message: any) => {
            //     console.log(message)
            //     this.board.lists[0].cards.push(new Card('1'));
            // });

            // this.socketService.onMessage('message2').subscribe((message: any) => {
            //     console.log(message)
            //     this.board.lists[0].cards.push(new Card('2'));
            // });

            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                (<any>window).ga('set', 'page', event.urlAfterRedirects);
                (<any>window).ga('send', 'pageview');
                }
            });
    }

    //#endregion

    //#region Board

    updateBoardName(): void{
        this.isBoardTitleEditable = false;
        if(this.boardTitleForm.valid)
            this.board.name = this.boardTitleForm.value;
    }

    //#endregion

    //#region Lists

    addibleListHandler(show: boolean): void{
        if(show)
            this.isNewTitleEditable = true;
        else
            this.isNewTitleEditable = false;
    }

    newCardList(): void {
        this.board.lists.push(new CardList(this.newTitleFormControl.value));

        let listsArray =  <FormArray>this.listsTitleForm.controls['lists'];
        listsArray.push(this.formBuilder.group({
            name: [this.newTitleFormControl.value, [Validators.required]]
        }));

        this.newTitleFormControl.reset();
    }

    updateListName(index: number): void{
        this.board.lists[index].isListEditable = false;
        let newTitleFormControl = <FormControl>(<FormGroup>(<FormArray>this.listsTitleForm.controls['lists']).controls[index]).controls['name'];
        if(newTitleFormControl.valid)
            this.board.lists[index].name = newTitleFormControl.value;
    }

    removeListCard(index: number): void {
        let listsArray = <FormArray>this.listsTitleForm.controls['lists'];
        if (listsArray.length > 1) {
            listsArray.removeAt(index);
        }
    }

    moveListTo(currentIndex: number, index: number): void{
        this.board.lists[currentIndex].cards.forEach((card) => {
            this.board.lists[index].cards.push(card);
        });
        this.board.lists[currentIndex].cards = new Array<Card>();
    }

    //#endregion

    //#region Cards

    addibleCardHandler(show: boolean, index: number): void{
        if(show){
            this.board.lists[index].isCardAddible = true;
        }
        else{
            this.board.lists[index].isCardAddible = false;
            if(this.newCardFormControl.valid)
                this.newCard(this.board.lists.findIndex(m => m.isCardAddible == true));
            else
                this.newCardFormControl.reset();
        }
    }
    
    newCard(index: number): void {
        this.board.lists[index].cards.push(new Card(this.newCardFormControl.value));
        
        this.newCardFormControl.reset();
        this.board.lists[index].isCardAddible = false;
    }

    cancelCard(index: number): void{
        this.board.lists[index].isCardAddible = false;
        this.newCardFormControl.reset();
    }

    //#endregion

    //#region Drag and Drop

    cardenter (event: MouseEvent, indexList: number, indexItem: number): void {
        this.CurrentList = indexList;
        this.CurrentItem = indexItem;
        this.renderer2.addClass(event.target, 'mat-elevation-z5');
        this.renderer2.setStyle(event.target, 'background', 'rgb(224, 224, 224)') 
    }

    cardleave (event: MouseEvent): void {
       this.CurrentList = -1;
       this.CurrentItem = -1;
       this.renderer2.removeClass(event.target, 'mat-elevation-z5')
       this.renderer2.removeStyle(event.target, 'background')
    }

    get trackCardListNames(): string[] {
        return this.board.lists.map(cardlist => cardlist.name);
    }

    drop(event: CdkDragDrop<CardList[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
    }

    dropCard(event: CdkDragDrop<Card[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);
        }
    }

    //#endregion


    testingCreate(){
        let array: Array<Card> = new Array<Card>();
        array.push(new Card('TFG'))
        array.push(new Card('Angular'))
        let array2: Array<Card> = new Array<Card>()
        array2.push(new Card('Boards'))
        array2.push(new Card('Dash'))
        let array3: Array<Card> = new Array<Card>()
        array3.push(new Card('English'))
        array3.push(new Card('Spanish'))
        
        this.board = new Board("Project Manager");
        this.board.addCardList(new CardList('TODO', array));
        this.board.addCardList(new CardList('Done', array2));
        this.board.addCardList(new CardList('Perfect', array3));

        let listsArray=  <FormArray>this.listsTitleForm.controls['lists'];
        listsArray.push(this.formBuilder.group({
            name: ['TODO', [Validators.required]]
        }));
        listsArray.push(this.formBuilder.group({
            name: ['Done', [Validators.required]]
        }));
        listsArray.push(this.formBuilder.group({
            name: ['Perfect', [Validators.required]]
        }));
    }
}