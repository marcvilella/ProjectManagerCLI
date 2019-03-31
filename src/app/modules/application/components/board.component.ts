import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { moveItemInArray, CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import { Store, select } from '@ngrx/store';

import { CardList, CardItem, Board, IBoard, ICardItem } from 'src/app/shared/models/boards';
import { IAppState } from 'src/app/shared/store/state/app.state';
import { GetBoard, UpdateBoard, UpdateBoardStarred, AddCardList, UpdateCardListPriority, UpdateCardItemPriority, SaveBoardState, MoveCardListItems } from 'src/app/shared/store/actions/board.actions';


@Component({
    selector: 'board-component',
    templateUrl: '../views/board.html',
    styleUrls: ['../styles/board.component.scss', '../../../app.component.scss'],
})
export class BoardComponent {

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
        private _store: Store<IAppState>) {
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

    changeBoardTitleState() {
        this.boardTitleForm.setValue(this.board.name);
        this.isBoardTitleEditable = true;
    }

    updateBoardName(): void {
        console.log('name: ' + this.board.name + '     form: ' + this.boardTitleForm.value);
        this.isBoardTitleEditable = false;
        if (this.boardTitleForm.valid && this.board.name !== this.boardTitleForm.value) {
            this._store.dispatch(new UpdateBoard({id: this.board._id, name: this.boardTitleForm.value}));
        }
    }

    changeStarredStatus(): void {
        this._store.dispatch(new UpdateBoardStarred({id: this.board._id, starred: !this.board.settings.starred}));
    }

    //#endregion

    //#region Lists

    addibleListHandler(show: boolean): void {
        if (show) {
            this.isNewCardListAddible = true;
        } else {
            this.isNewCardListAddible = false;
        }
    }

    newCardList(): void {
        this._store.dispatch(new AddCardList({
            id: this.board._id,
            name: this.newCardListFormControl.value,
            priority: this.board.lists.length
        }));

        this.isNewCardListAddible = false;
        this.newCardListFormControl.reset();
    }

    moveListTo(event: {id: number, destinationId: number}): void {
        this._store.dispatch(new MoveCardListItems({id: event.id, destinationId: event.destinationId}));

        // const currentList = this.board.lists.find(m => m._id === event.currentListId);
        // const newList = this.board.lists.find(m => m._id === event.newListId);
        // let counter = newList.cards.length;
        // currentList.cards.forEach(cardItem => {
        //     cardItem.cardListId = event.newListId;
        //     cardItem.priority = counter;
        //     newList.cards.push(cardItem);
        //     counter++;
        // });
        // currentList.cards = [];
    }

    //#endregion

    //#region Drag and Drop

    get trackCardListIds(): number[] {
        return this.board.lists.map(cardlist => cardlist._id);
    }

    get cardListNames(): string[] {
        return this.board.lists.map(cardlist => cardlist.name);
    }

    drop(event: CdkDragDrop<CardList[]>): void {
        if (event.previousContainer === event.container) {
            if (event.previousIndex === event.currentIndex) {
                return;
            }

            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

            let counter = 0;
            event.container.data.forEach(cardList => {
                cardList.priority = counter;
                counter++;
            });

            this._store.dispatch(new UpdateCardListPriority({
                cardLists: event.container.data.map(cardList => <any>{id: cardList._id, priority: cardList.priority})
            }));
        }
    }

    dropCard(event: CdkDragDrop<ICardItem[]>): void {
        let counter = 0;
        this._store.dispatch(new SaveBoardState({
            action: new UpdateCardItemPriority(null)
        }));

        if (event.previousContainer === event.container) {
            if (event.previousIndex === event.currentIndex) {
                return;
            }

            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

            const currentCardItems = event.container.data.map(cardItem => <ICardItem>{_id: cardItem._id, priority: cardItem.priority});
            currentCardItems.forEach(cardItem => {
                cardItem.priority = counter;
                counter++;
            });

            this._store.dispatch(new UpdateCardItemPriority({
                to: {
                    id: event.container.data[event.currentIndex].cardListId,
                    carditems: currentCardItems
                }
            }));
        } else {
            transferArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);

            const previusCardItems = event.previousContainer.data.map(cardItem => <ICardItem>{_id: cardItem._id, priority: cardItem.priority});
            previusCardItems.forEach(cardItem => {
                cardItem.priority = counter;
                counter++;
            });

            counter = 0;
            const currentCardItems = event.container.data.map(cardItem => <ICardItem>{_id: cardItem._id, priority: cardItem.priority});
            currentCardItems.forEach(cardItem => {
                cardItem.priority = counter;
                counter++;
            });

            this._store.dispatch(new UpdateCardItemPriority({
                changedId: event.container.data[event.currentIndex]._id,
                from: {
                    id: event.container.data[event.currentIndex].cardListId,
                    carditems: previusCardItems
                },
                to: {
                    id: this.board.lists.find(m => m._id.toString() === event.container.id)._id,
                    carditems: currentCardItems
                }
            }));
        }

      }

    //#endregion


    testingCreate() {
        const array: Array<CardItem> = new Array<CardItem>();
        array.push(new CardItem('TFG'));
        array.push(new CardItem('Angular'));
        const array2: Array<CardItem> = new Array<CardItem>();
        array2.push(new CardItem('Boards'));
        array2.push(new CardItem('Dash'));
        const array3: Array<CardItem> = new Array<CardItem>();
        array3.push(new CardItem('English'));
        array3.push(new CardItem('Spanish'));

        this.board = new Board('Project Manager');
        this.board.addCardList(new CardList('TODO', array));
        this.board.addCardList(new CardList('Done', array2));
        this.board.addCardList(new CardList('Perfect', array3));
    }
}
