import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from 'src/app/shared/models/boards';
import { IUser } from 'src/app/shared/models/user';

@Component({
      selector: 'common-activity-viewer',
      templateUrl: './activity.viewer.html',
      styleUrls: ['../../../styles/common.scss']
})
export class ActivityViewerComponent implements OnInit {

      //#region Members

      @Input() messages: IMessage[];
      @Input() users: IUser[];

      comments: IMessage[];
      cardActivities: IMessage[];

      //#endregion

      //#region Constructor

      constructor() {
      }

      ngOnInit() {
            if (this.messages === undefined){
                  this.comments = new Array<IMessage>();
                  this.cardActivities = new Array<IMessage>();
            } else {
                  this.comments = this.messages.filter(m => m.priority === 0);
                  this.cardActivities = this.messages.filter(m => m.priority === 1);
            }
      }

      //#endregion


      //#region Functions - Show/Hide details

      showDetails(): void {
            console.log('show');
      }

      hideDetails(): void {
            console.log('hide');
      }

      //#endregion
}
