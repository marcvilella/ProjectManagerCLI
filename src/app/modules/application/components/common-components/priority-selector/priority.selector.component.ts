import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IPriority, priorities } from 'src/app/shared/models/priorities';
import { TranslateService } from '@ngx-translate/core';

@Component({
      selector: 'common-priority-selector',
      templateUrl: './priority.selector.html',
      styleUrls: ['../../../styles/common.scss']
})
export class PrioritySelectorComponent implements OnInit {

      @Input() priority: number;
      @Output() priorityChanged = new EventEmitter<number>();

      //#region Members

      priorities: Array<IPriority>;
      prioritySelected: IPriority;

      //#endregion

      //#region Constructor

      constructor(public translate: TranslateService) {
      }

      ngOnInit() {
            this.priorities = priorities;
            this.prioritySelected = this.priorities.find(m => m.priority === this.priority);
      }

      //#endregion

      //#region Functions

      getTranslation(path: string): string {
            return this.translate.instant(path);
      }

      onSelectedChange(priority: number) {
            this.prioritySelected = this.priorities.find(m => m.priority === priority);
            this.priorityChanged.emit(+this.prioritySelected);
      }

      //#endregion
}
