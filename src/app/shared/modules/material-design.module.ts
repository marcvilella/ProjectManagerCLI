import { NgModule } from '@angular/core';

import { MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatDividerModule,
  MatSnackBarModule, MatDialogModule, MatProgressSpinnerModule, MatToolbarModule, MatSidenavModule, MatListModule, MatCardModule,
  MatMenuModule, MatExpansionModule, MatGridListModule, MatTooltipModule, MatDatepickerModule, MatProgressBarModule, MatTabsModule,
  MatTableModule } from '@angular/material';

import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';


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
      
      DragDropModule,
      OverlayModule
  ]
})
export class MaterialDesignModule { }
