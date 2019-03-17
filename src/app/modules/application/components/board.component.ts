import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { moveItemInArray, CdkDragDrop} from '@angular/cdk/drag-drop';
import { Store, select } from '@ngrx/store';

import { CardList, Card, Board, IBoard } from 'src/app/shared/models/boards';
import { IAppState } from 'src/app/shared/store/state/app.state';


@Component({
    selector: 'board',
    templateUrl: '../views/board.html',
    styleUrls: ['../styles/board.component.scss', '../../../app.component.scss'], 
})
export class BoardComponent{

    //#region Properties  

    @Input() board: IBoard;

    settings: boolean;

    isBoardTitleEditable: boolean;
    isNewCardListAddible: boolean;

    //#endregion

    //#region FormControls
    boardTitleForm: FormControl;
    newCardListFormControl: FormControl;
    //#endregion
    
    //#region Constructor
    
    constructor(
        private router: Router, 
        private _store: Store<IAppState>) 
        {
            this.settings = false;
            this.isBoardTitleEditable = false;
            this.isNewCardListAddible = false;

            this.boardTitleForm = new FormControl('', Validators.required);
            this.newCardListFormControl = new FormControl('', Validators.required);

            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                (<any>window).ga('set', 'page', event.urlAfterRedirects);
                (<any>window).ga('send', 'pageview');
                }
            });
    }

    //#endregion

    //#region Board

    changeBoardTitleState(){
        this.boardTitleForm.setValue(this.board.name);
        this.isBoardTitleEditable = true;
    }

    updateBoardName(): void{
        this.isBoardTitleEditable = false;
        if(this.boardTitleForm.valid)
            this.board.name = this.boardTitleForm.value;
    }

    //#endregion

    //#region Lists

    addibleListHandler(show: boolean): void{
        if(show)
            this.isNewCardListAddible = true;
        else
            this.isNewCardListAddible = false;
    }

    newCardList(): void {
        this.board.lists.push(new CardList(this.newCardListFormControl.value));

        this.newCardListFormControl.reset();
    }

    

    //#endregion

    //#region Drag and Drop

    get trackCardListNames(): string[] {
        return this.board.lists.map(cardlist => cardlist.name);
    }

    drop(event: CdkDragDrop<CardList[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
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
    }
}