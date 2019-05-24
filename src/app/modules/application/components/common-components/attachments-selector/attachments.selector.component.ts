import { Component, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';

import { AttachmentUploadDialogComponent } from './attachment.upload.dialog';
import { IAppState } from 'src/app/shared/store/state/app.state';
import { IAttachment } from 'src/app/shared/models/boards';
import { AddCardItemAttachment, GetCardItem, DeleteCardItemAttachment, UpdateCardItemAttachment } from 'src/app/shared/store/actions/board.actions';


@Component({
      selector: 'common-attachments-selector',
      templateUrl: './attachments.selector.html',
      styleUrls: ['../../../styles/common.scss']
})
export class AttachmentsSelectorComponent {

      //#region Members

      @Input() attachments: Array<IAttachment>;
      @Input() id: number;

      canReturn: Boolean;

      @ViewChild('fileInput') fileInput: ElementRef;
      linkSelected: Boolean;
      linkFormControl: FormControl;

      //#endregion

      //#region Constructor

      constructor(
            public dialog: MatDialog,
            private renderer2: Renderer2,
            private _store: Store<IAppState>
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
                  this.canReturn = false;
            }
      }

      //#endregion

      //#region Functions - Creation

      openFileDialog(): void {
            this.fileInput.nativeElement.dispatchEvent(new MouseEvent('click', {bubbles: false}));
      }

      onFileAdded(): void {
            if (this.fileInput.nativeElement.files.length > 0) {
                  this.dialog.open(AttachmentUploadDialogComponent, {
                        width: '50%',
                        data: {
                              files: this.fileInput.nativeElement.files,
                              cardId: this.id
                        }
                  }).afterClosed().subscribe((result: any) => {
                        if (result === true) {
                              this._store.dispatch(new GetCardItem({id: this.id}));
                        }
                  });
            }
      }

      saveLink(): void {
            this._store.dispatch(new AddCardItemAttachment({cardId: this.id, value: this.linkFormControl.value + '//link'}));
            this.canReturn = true;
      }

      //#endregion

      //#region Functions - Events

      updateAttachmentProperties(event: {id: number, name: string, value?: string}): void {
            this._store.dispatch(new UpdateCardItemAttachment({id: event.id, cardId: this.id, name: event.name, value: event.value}));
            this.canReturn = true;
      }

      deleteAttachment(event: number): void {
            this._store.dispatch(new DeleteCardItemAttachment({id: event, cardId: this.id}));
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
}
