import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';

import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'common-atttachment-upload',
  templateUrl: './attachment.upload.dialog.html',
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
export class AttachmentUploadDialogComponent implements OnInit {

      //#region Members

      public files: Set<File>;
      progress: any;

      uploading: boolean;
      uploadSuccessful: boolean;
      error: boolean;

      //#endregion

      //#region Constructor

      constructor(
            public dialogRef: MatDialogRef<AttachmentUploadDialogComponent>,
            public uploadService: UploadService,
            @Inject(MAT_DIALOG_DATA) public data: { files: any }
      ) {
            this.files = new Set();

            this.uploading = false;
            this.uploadSuccessful = false;
            this.error = false;
      }

      ngOnInit() {

            // Prepare data
            const files: { [key: string]: File } = this.data.files;
            for (const key in files) {
                  if (!isNaN(parseInt(key, 10))) {
                        this.files.add(files[key]);
                  }
            }

            this.upload();
      }

      //#endregion

      //#region Function - Size

      getFileSize(filesize: number): string {
            const kB = filesize * 0.0009765625;
            if (kB < 1) {
                  return '< 1 KB';
            } else if (kB < 1000) {
                  return kB.toFixed(0) + ' KB';
            } else {
                  return ( kB / 1000).toFixed(3) + ' KB';
            }
      }

      //#endregion

      //#region Functions - Upload

      upload(onlyErrors: boolean = false): void {
            // Start Upload
            this.uploading = true;
            this.dialogRef.disableClose = true;

            if (onlyErrors) {
                  this.progress = this.uploadService.upload(this.files);
            } else {
                  this.progress = this.uploadService.upload(this.files);
            }

            for (const key of Object.keys(this.progress)) {
                  this.progress[key].progress.subscribe((val: any) => console.log(val));
            }

            // Convert the progress map into an array
            const allProgressObservables = [];
            for (const key of Object.keys(this.progress)) {
                  allProgressObservables.push(this.progress[key].progress);
            }

            // When all progress-observables are completed...
            forkJoin(allProgressObservables).subscribe(
                  end => {
                        this.uploadSuccessful = true;
                        this.uploading = false;
                        this.dialogRef.close();
                  },
                  error => {
                        this.error = true;
                        this.dialogRef.disableClose = false;
            });
      }

      //#endregion
}
