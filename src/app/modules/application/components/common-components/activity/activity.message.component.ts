import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { IMessage } from 'src/app/shared/models/boards';
import { IUser } from 'src/app/shared/models/user';

@Component({
      selector: 'common-activity-message',
      templateUrl: './activity.message.html',
      styleUrls: ['../../../styles/common.scss']
})
export class ActivityMessageComponent {

      //#region Members

      @Input() message: IMessage;
      @Input() users: IUser[];

      commentFormControl: FormControl;
      isEdit: boolean;
      canReturn: boolean;

      //#endregion

      //#region Constructor

      constructor() {
            this.commentFormControl = new FormControl('', Validators.required)

            this.isEdit = false;
            this.canReturn = false;
      }

      //#endregion


      //#region Functions - Edit

      editMessage(): void {
            this.commentFormControl.setValue(this.message.text);
            this.isEdit = true;
      }

      saveChanges(): void {
            this.isEdit = false;
      }

      cancelEdit(): void {
            this.isEdit = false;
      }

      //#endregion

      //#region Functions - Edit

      deleteMessage(): void {
            this.canReturn = true;
      }

      //#endregion

      //#region Function - Can Return

      stopPropagation(event: MouseEvent): void {
            if (!this.canReturn) {
                  event.stopPropagation();
            } else {
                  this.canReturn = false;
            }
      }

      //#endregion
}
