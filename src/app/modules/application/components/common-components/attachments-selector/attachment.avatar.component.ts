import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IAttachment } from 'src/app/shared/models/boards';

@Component({
      selector: 'common-attachment-avatar',
      templateUrl: './attachment.avatar.html',
      styleUrls: ['../../../styles/common.scss']
})
export class AttachmentsAvatarComponent implements OnInit {

      //#region Members

      @Input() attachment: IAttachment;

      canReturn: Boolean;

      Attachment: IAttachment;
      linkFormControl: FormControl;
      nameFormControl: FormControl;

      //#endregion

      //#region Constructor

      constructor() {
            this.canReturn = false;
      }

      ngOnInit() {
            this.Attachment = this.attachment;
            this.nameFormControl = new FormControl(this.Attachment.name, Validators.required);
            if (this.Attachment.link !== undefined) {
                  this.linkFormControl = new FormControl(this.Attachment.link, Validators.required); 
            }
      }

      //#endregion

      //#region Functions - General

      stopPropagation(event: MouseEvent): void {
            if (!this.canReturn) {
                  event.stopPropagation();
            } else {
                  this.canReturn = false;
                  // this.setDefaultCanReturn();
            }
      }

      //#endregion

      //#region Functions - Link

      editLink(): void {
            console.log('open')
      }

      unselectLink(): void {
            console.log('close')
      }

      saveLink(): void {
            this.attachment.link = <String>this.linkFormControl.value;

            this.canReturn = true;
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
            this.canReturn = false;
      }

//#endregion
}
