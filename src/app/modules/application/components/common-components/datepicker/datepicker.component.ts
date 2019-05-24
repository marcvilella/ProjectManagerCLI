import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';
import { environment } from 'src/environments/environment';

import { IDueDate } from 'src/app/shared/models/boards';

@Component({
  selector: 'common-datepicker',
  templateUrl: './datepicker.html',
  styleUrls: ['../../../styles/common.scss', '../../../styles/checkbox.white.scss']
})
export class DatepickerComponent implements OnChanges {

      @Input() dueDate: IDueDate;
      @Output() changedDueDate = new EventEmitter<IDueDate>();
      @Output() checkedDueDate = new EventEmitter<boolean>();

      //#region Members

      canReturn: boolean;

      DateFormControl: FormControl;
      TimeFormControl: FormControl;
      Reminder: String;

      DueDateColor: String;
      DueDateText: String;

      //#endregion

      //#region Constructor

      constructor(
            private adapter: DateAdapter<any>,
            public translate: TranslateService
      ) {
            this.adapter.setLocale(localStorage.getItem('language'));
            this.canReturn = false;

            this.DueDateColor = environment.colors.buttonBackground;

            this.DateFormControl = new FormControl(moment());
            this.TimeFormControl = new FormControl('12:00', Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/));
            this.Reminder = '1440';
      }

      ngOnChanges(changes: any) {
            if (this.dueDate !== undefined && this.dueDate.date !== undefined) {
                  this.setDateText();
                  this.setButtonColor(this.dueDate.done);
            } else {
                  this.DueDateColor = environment.colors.buttonBackground;
            }
      }

      //#endregion

      //#region Functions - Functionality

      onCheckDueDate(checked: boolean): void {
            this.changedDueDate.emit({
                  date: this.dueDate.date,
                  remindAt: this.dueDate.remindAt,
                  done: checked
            });
            this.setButtonColor(checked);
      }

      saveDate(): void {
            this.canReturn = true;
            const time = (<String>this.TimeFormControl.value).split(':');

            this.changedDueDate.emit({
                  date: moment(this.DateFormControl.value).hours(+time[0]).minutes(+time[1]).seconds(0).milliseconds(0).utc().toDate(),
                  remindAt: +this.Reminder,
                  done: false
            });
      }

      removeDate(): void {
            this.canReturn = true;
            this.changedDueDate.emit(undefined);
      }

      //#endregion

      //#region Functions - Design

      stopPropagation(event: MouseEvent): void {
            if (!this.canReturn) {
                  event.stopPropagation();
            } else {
                  this.canReturn = false;
            }
      }

      setDateText(): void {
            this.DueDateText = ' ' + (<String>this.translate.instant('APPLICATION.Common.Date.At')).toLowerCase() +  ' ' +
                  this.dueDate.date.getHours().toString().padStart(2, '0') + ':' + this.dueDate.date.getMinutes().toString().padStart(2, '0');

            const today = moment().toDate();
            if (this.dueDate.date.getMonth() === today.getMonth() && this.dueDate.date.getFullYear() === today.getFullYear()) {
                  if (this.dueDate.date.getDate() === today.getDate()) {
                        this.DueDateText += ' (' + this.translate.instant('APPLICATION.Common.Date.Today') + ')';
                  } else if (this.dueDate.date.getDate() === today.getDate() - 1) {
                        this.DueDateText += ' (' + this.translate.instant('APPLICATION.Common.Date.Yesterday') + ')';
                  } else if (this.dueDate.date.getDate() === today.getDate() + 1) {
                        this.DueDateText += ' (' + this.translate.instant('APPLICATION.Common.Date.Tomorrow') + ')';
                  }
            }
      }

      setButtonColor(checked: boolean): void {
            if (checked) {
                  this.DueDateColor = 'green';
            } else {
                  if (this.dueDate.date < moment().toDate()) {
                        this.DueDateColor = 'red';
                  } else {
                        this.DueDateColor = environment.colors.buttonBackground;
                  }
            }
      }

      //#endregion

}
