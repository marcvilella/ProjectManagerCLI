import { Component, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { IAttachment } from 'src/app/shared/models/boards';
import { AttachmentUploadDialogComponent } from './attachment.upload.dialog';

@Component({
      selector: 'common-attachments-selector',
      templateUrl: './attachments.selector.html',
      styleUrls: ['../../../styles/common.scss']
})
export class AttachmentsSelectorComponent {

      //#region Members

      // @Input() attachments: Array<IAttachment>;
      attachments: Array<IAttachment>;
      canReturn: Boolean;

      @ViewChild('fileInput') fileInput: ElementRef;
      linkSelected: Boolean;
      linkFormControl: FormControl;

      //#endregion

      //#region Constructor

      constructor(
            public dialog: MatDialog,
            private renderer2: Renderer2
      ) {
            this.canReturn = false;
            this.attachments = new Array<IAttachment>();
            this.linkFormControl = new FormControl('', Validators.required);
      }

      //#endregion

      //#region Functions - General

      stopPropagation(event: MouseEvent): void {
            if (!this.canReturn) {
                  event.stopPropagation();
            } else {
                  this.setDefaultCanReturn();
            }
      }

      //#endregion

      //#region Functions - File

      openFileDialog(): void {
            this.fileInput.nativeElement.dispatchEvent(new MouseEvent('click', {bubbles: false}));
      }

      onFileAdded(): void {
            this.dialog.open(AttachmentUploadDialogComponent, {
                  width: '50%',
                  data: {
                        files: this.fileInput.nativeElement.files
                  }
            });
            this.fileInput.nativeElement.files = [];
      }

      //#endregion

      //#region Functions - Link

      selectLink(): void {
            this.linkSelected = true;
      }

      unselectLink(): void {
            this.linkSelected = false;
      }

      saveLink(): void {
            this.attachments.push({
                  _id: 0,
                  dataType: 'L I N K',
                  name: <String>this.linkFormControl.value,
                  userName: 'Marc Vilella',
                  link: <String>this.linkFormControl.value,
                  date: new Date
            });

            this.canReturn = true;
      }

      //#endregion

      //#region Enter and Out

      cardenter (event: MouseEvent): void {
            this.renderer2.addClass(event.target, 'mat-elevation-z5');
      }

      cardleave (event: MouseEvent): void {
            this.renderer2.removeClass(event.target, 'mat-elevation-z5');
      }

    //#endregion

     //#region Async - Reset CanReturn

     waitSeconds(miliseconds: any): Promise<any> {
      return new Promise(resolve => {
                  setTimeout(() => {
                        resolve();
                  }, miliseconds);
            });
      }

      async setDefaultCanReturn() {
            await this.waitSeconds(1000);
            this.linkFormControl.setValue('');
            this.canReturn = false;
      }

//#endregion
}
