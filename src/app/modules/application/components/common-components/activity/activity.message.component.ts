import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { IUser } from 'src/app/shared/models/user';
import { IMessage } from 'src/app/shared/models/message';
import { UpdateMessage, DeleteMessage } from 'src/app/shared/store/actions/message.actions';

@Component({
      selector: 'common-activity-message',
      templateUrl: './activity.message.html',
      styleUrls: ['../../../styles/common.scss']
})
export class ActivityMessageComponent implements OnInit {

      //#region Members

      @Input() message: IMessage;
      @Input() users: IUser[];
      @Input() selectedUser: IUser;

      username: string;
      commentFormControl: FormControl;

      showEdit: boolean;
      isEdit: boolean;
      canReturn: boolean;

      //#endregion

      //#region Constructor

      constructor(private _store: Store<IAppState>) {
            this.commentFormControl = new FormControl('', Validators.required);

            this.showEdit = false;
            this.isEdit = false;
            this.canReturn = false;
      }

      ngOnInit() {
            const user = this.users.find(m => m._id === this.message.userId);
            if (user !== undefined) {
                  this.username = user.name + ' ' + user.surname;
            } else {
                  this.username = this.message.userName;
            }
      }

      //#endregion


      //#region Functions - Edit

      editMessage(): void {
            this.commentFormControl.setValue(this.message.text);
            this.isEdit = true;
      }

      saveChanges(): void {
            if (this.commentFormControl.valid && this.commentFormControl.value !== this.message.text) {
                  this._store.dispatch(new UpdateMessage({id: this.message._id, text: this.commentFormControl.value}));
            }
            this.isEdit = false;
      }

      cancelEdit(): void {
            this.isEdit = false;
      }

      deleteMessage(): void {
            this._store.dispatch(new DeleteMessage({id: this.message._id}));
            this.isEdit = false;
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

      //#region Moving in and out

      messageenter(event: MouseEvent): void {
            this.showEdit = true;
      }

      messageleave(event: MouseEvent): void {
            this.showEdit = false;
      }

    //#endregion

}
