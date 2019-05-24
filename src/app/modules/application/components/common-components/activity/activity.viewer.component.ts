import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { IMessage } from 'src/app/shared/models/message';
import { IUser } from 'src/app/shared/models/user';

@Component({
      selector: 'common-activity-viewer',
      templateUrl: './activity.viewer.html',
      styleUrls: ['../../../styles/common.scss']
})
export class ActivityViewerComponent implements OnChanges {

      //#region Members

      @Input() messages: IMessage[];
      @Input() users: IUser[];
      @Input() selectedUser: IUser;

      comments: IMessage[];
      cardActivities: IMessage[];

      //#endregion

      //#region Constructor

      constructor() {
      }

      ngOnChanges(changes: any) {
            this.comments = this.messages.filter(m => m.priority === 0);
            this.cardActivities = this.messages.filter(m => m.priority === 1);
      }

      //#endregion

}
