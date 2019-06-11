import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'common-file-preview',
  template: `<img [src]="imageBlobUrl">`,
  styles: [`
    :host {
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    .actions {
      justify-content: flex-end;
    }`]
})
export class FilePreviewDialogComponent {

      //#region Members

      imageBlobUrl: string | null;

      //#endregion

      //#region Constructor

      constructor(
            public dialogRef: MatDialogRef<FilePreviewDialogComponent>,
            @Inject(MAT_DIALOG_DATA) public data: { url: any }
      ) {
            this.imageBlobUrl = data.url;
      }

      //#endregion
}
