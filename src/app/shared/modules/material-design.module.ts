import { NgModule } from '@angular/core';

import { MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatDividerModule,
  MatSnackBarModule, MatDialogModule, MatProgressSpinnerModule, MatToolbarModule, MatSidenavModule, MatListModule, MatCardModule,
  MatMenuModule, MatExpansionModule, MatGridListModule, MatTooltipModule, MatDatepickerModule, MatProgressBarModule, MatTabsModule,
  MatTableModule, MatRippleModule, MatSortModule, MatPaginatorModule, MatPaginatorIntl} from '@angular/material';

import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';


// Lista iconos: https://material.io/tools/icons/

@NgModule({
  imports: [
  ],
  exports: [
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatCheckboxModule,
      MatDividerModule,
      MatSnackBarModule,
      MatDialogModule,
      MatProgressSpinnerModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatCardModule,
      MatMenuModule,
      MatExpansionModule,
      MatGridListModule,
      MatTooltipModule,
      MatDatepickerModule,
      MatMomentDateModule,
      MatProgressBarModule,
      MatTabsModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatRippleModule,

      DragDropModule,
      OverlayModule
  ]
})
export class MaterialDesignModule { }


export function getTranslatePaginatorIntl (translate: TranslateService) {
  const paginatorIntl = new MatPaginatorIntl ();

  paginatorIntl.itemsPerPageLabel = translate.instant('APPLICATION.Common.DataTable.itemsPerPage');
  paginatorIntl.firstPageLabel = translate.instant('APPLICATION.Common.DataTable.firstPage');
  paginatorIntl.previousPageLabel = translate.instant('APPLICATION.Common.DataTable.previousPage');
  paginatorIntl.nextPageLabel = translate.instant('APPLICATION.Common.DataTable.nextPage');
  paginatorIntl.lastPageLabel = translate.instant('APPLICATION.Common.DataTable.lastPage');

  paginatorIntl.getRangeLabel =  function (page: any, pageSize: any, length: any) {
    if (length === 0 || pageSize === 0) {
      return '0 ' + translate.instant('APPLICATION.Common.DataTable.of') + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' ' + translate.instant('APPLICATION.Common.DataTable.of') + ' ' + length;
  };

  return paginatorIntl;

}