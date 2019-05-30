import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BoardCreateDialogComponent } from '../board-creator-dialog/board.create.dialog.component';
import { selectAllBoardsItems } from 'src/app/shared/store/selectors/board.selectors';
import { IAppState } from 'src/app/shared/store/state/app.state';
import { IBoard } from 'src/app/shared/models/boards';

@Component({
    selector: 'app-board-home',
    templateUrl: './board.home.html',
    styleUrls: ['../../../styles/board.component.scss', '../../../styles/common.scss'],
})
export class BoardHomeComponent implements OnInit {

    //#region Members

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    boards$: Observable<IBoard[]>;
    dataSource: MatTableDataSource<IBoard>;
    displayedColumns: string[];

    //#endregion

    //#region Constructor

    constructor(
        private _store: Store<IAppState>,
        public dialog: MatDialog
    ) {
        this.boards$ = this._store.pipe(select(selectAllBoardsItems));
        this.dataSource = new MatTableDataSource();
        this.boards$.subscribe(boards => this.dataSource.data = boards);
        this.displayedColumns = ['name', 'mode' , 'createdAt', 'modifiedAt', 'starred'];
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item: any, property: string) => {
            switch (property) {
                case 'createdAt': return new Date(item.createdAt);
                case 'modifiedAt': return new Date(item.modifiedAt);
                case 'starred': return item.settings.starred;
                default: return item[property];
            }
        };

    }

    //#endregion

    //#region Functions

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    createNewBoard(): void {
        this.dialog.open(BoardCreateDialogComponent, {
            position: {top: '40px'},
            panelClass: 'form-dialog-container'
        });
    }

    //#endregion
}
