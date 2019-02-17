import { NgModule } from '@angular/core';

import { MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatDividerModule, 
  MatSnackBarModule, MatDialogModule, MatProgressSpinnerModule, MatToolbarModule, MatSidenavModule, MatListModule, MatCardModule,
MatMenuModule} from '@angular/material';

//Lista iconos: https://material.io/tools/icons/

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
      MatMenuModule
  ]
})
export class MaterialDesignModule {}