import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { moveItemInArray, CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';

import { IBoard, ICardItem, ICardList } from 'src/app/shared/models/boards';
import { IAppState } from 'src/app/shared/store/state/app.state';
import { UpdateBoard, UpdateBoardStarred, AddCardList, UpdateCardListPosition,
    UpdateCardItemPosition, SaveBoardState, MoveCardListItems } from 'src/app/shared/store/actions/board.actions';
import { BoardSettingsDialogContainerComponent } from './board-components/board-settings-dialog/board.settings.dialog.container.component';



@Component({
    selector: 'app-board',
    templateUrl: '../views/board.html',
    styleUrls: ['../styles/board.component.scss', '../styles/common.scss', '../../../app.component.scss'],
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
        public dialog: MatDialog,
        private _store: Store<IAppState>
    ) {
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
        this.isBoardTitleEditable = false;
        if (this.boardTitleForm.valid && this.board.name !== this.boardTitleForm.value) {
            this._store.dispatch(new UpdateBoard({id: this.board._id, name: this.boardTitleForm.value}));
        }
    }

    changeStarredStatus(): void {
        this._store.dispatch(new UpdateBoardStarred({id: this.board._id, starred: !this.board.settings.starred}));
    }

    openSettings(): void {
        this.dialog.open(BoardSettingsDialogContainerComponent, {
            position: {top: '5vh'},
            width: '65%',
            minWidth: '1100px',
            panelClass: 'noborder-dialog-container',
            data: { id: this.board._id }
        });
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
            position: this.board.lists.length
        }));

        this.isNewCardListAddible = false;
        this.newCardListFormControl.reset();
    }

    moveListTo(event: {id: number, destinationId: number}): void {
        this._store.dispatch(new MoveCardListItems({id: event.id, destinationId: event.destinationId}));
    }

    //#endregion

    //#region Drag and Drop

    get trackCardListIds(): number[] {
        return this.board.lists.map(cardlist => cardlist._id);
    }

    get cardListNames(): string[] {
        return this.board.lists.map(cardlist => cardlist.name);
    }

    drop(event: CdkDragDrop<ICardList[]>): void {
        if (event.previousContainer === event.container) {
            if (event.previousIndex === event.currentIndex) {
                return;
            }

            this._store.dispatch(new SaveBoardState({
                action: new UpdateCardListPosition(null)
            }));

            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

            let counter = 0;
            event.container.data.forEach(cardList => {
                cardList.position = counter;
                counter++;
            });

            this._store.dispatch(new UpdateCardListPosition({
                cardLists: event.container.data.map(cardList => <ICardList>{_id: cardList._id, position: cardList.position})
            }));
        }
    }

    dropCard(event: CdkDragDrop<ICardItem[]>): void {
        let counter = 0;
        this._store.dispatch(new SaveBoardState({
            action: new UpdateCardItemPosition(null)
        }));

        if (event.previousContainer === event.container) {
            if (event.previousIndex === event.currentIndex) {
                return;
            }

            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

            const currentCardItems = event.container.data.map(cardItem => <ICardItem>{_id: cardItem._id, position: cardItem.position});
            currentCardItems.forEach(cardItem => {
                cardItem.position = counter;
                counter++;
            });

            this._store.dispatch(new UpdateCardItemPosition({
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

            const previusCardItems = event.previousContainer.data.map(cardItem => <ICardItem>{_id: cardItem._id, position: cardItem.position});
            previusCardItems.forEach(cardItem => {
                cardItem.position = counter;
                counter++;
            });

            counter = 0;
            const currentCardItems = event.container.data.map(cardItem => <ICardItem>{_id: cardItem._id, position: cardItem.position});
            currentCardItems.forEach(cardItem => {
                cardItem.position = counter;
                counter++;
            });

            this._store.dispatch(new UpdateCardItemPosition({
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
}
