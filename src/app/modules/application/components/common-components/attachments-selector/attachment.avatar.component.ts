import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IAttachment } from 'src/app/shared/models/boards';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
      selector: 'common-attachment-avatar',
      templateUrl: './attachment.avatar.html',
      styleUrls: ['../../../styles/common.scss'],
})
export class AttachmentsAvatarComponent implements OnInit {

      //#region Members

      @Input() attachment: IAttachment;

      @Output() updatedProperties = new EventEmitter<{id: number, name: string, value?: string}>();
      @Output() delete = new EventEmitter<number>();

      canReturn: Boolean;

      Attachment: IAttachment;
      linkFormControl: FormControl;
      nameFormControl: FormControl;

      //#endregion

      //#region Constructor

      constructor(private uploadService: UploadService) {
            this.canReturn = false;
      }

      ngOnInit() {
            this.Attachment = this.attachment;
            this.nameFormControl = new FormControl(this.Attachment.name, Validators.required);
            this.linkFormControl = new FormControl(this.Attachment.value, Validators.required);
      }

      //#endregion

      //#region Functions

      openAttachment(): void {
            if (this.attachment.dataType === ' l i n k') {
                  window.open(this.attachment.value, '_blank');
            } else {
                  this.uploadService.download(this.attachment.value, this.attachment.reqType);
            }

            this.canReturn = true;
      }

      saveProperties(): void {
            if (this.attachment.dataType === ' l i n k') {
                  this.updatedProperties.emit({id: this.attachment._id, name: this.nameFormControl.value, value: this.linkFormControl.value});
            } else {
                  this.updatedProperties.emit({id: this.attachment._id, name: this.nameFormControl.value});
            }

            this.canReturn = true;
      }

      deleteAttachment(): void {
            this.delete.emit(this.attachment._id);
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
}
