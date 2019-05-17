import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';
import { environment } from 'src/environments/environment';

import { ICardItem } from 'src/app/shared/models/boards';

@Component({
  selector: 'common-datepicker',
  templateUrl: './datepicker.html',
  styleUrls: ['../../../styles/common.scss', '../../../styles/checkbox.white.scss']
})
export class DatepickerComponent {

      @Input() card: ICardItem;

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

      //#endregion

      //#region Functions

      stopPropagation(event: MouseEvent): void {
            if (!this.canReturn) {
                  event.stopPropagation();
            } else {
                  this.canReturn = false;
            }
      }

      saveDate(): void {
            this.canReturn = true;

            const date = moment(this.DateFormControl.value).toDate();
            const time = (<String>this.TimeFormControl.value).split(':');
            date.setHours(+time[0], +time[1]);

            this.card.dueDate = { date: date, remindAt: +this.Reminder, done: false };
            this.setDateText();
            this.onCheckDueDate(false);
      }

      removeDate(): void {
            this.canReturn = true;
            this.DueDateColor = environment.colors.buttonBackground;

            this.card.dueDate = undefined;
      }

      setDateText(): void {
            this.DueDateText = ' ' + (<String>this.translate.instant('APPLICATION.Common.Date.At')).toLowerCase() +  ' ' +
                  this.card.dueDate.date.getHours().toString().padStart(2, '0') + ':' + this.card.dueDate.date.getMinutes().toString().padStart(2, '0');

            const today = moment().toDate();
            if (this.card.dueDate.date.getMonth() === today.getMonth() && this.card.dueDate.date.getFullYear() === today.getFullYear()) {
                  if (this.card.dueDate.date.getDate() === today.getDate()) {
                        this.DueDateText += ' (' + this.translate.instant('APPLICATION.Common.Date.Today') + ')';
                  } else if (this.card.dueDate.date.getDate() === today.getDate() - 1) {
                        this.DueDateText += ' (' + this.translate.instant('APPLICATION.Common.Date.Yesterday') + ')';
                  } else if (this.card.dueDate.date.getDate() === today.getDate() + 1) {
                        this.DueDateText += ' (' + this.translate.instant('APPLICATION.Common.Date.Tomorrow') + ')';
                  }
            }
      }

      onCheckDueDate(checked: Boolean): void {
            if (checked) {
                  this.DueDateColor = 'green';
            } else {
                  if (this.card.dueDate.date < moment().toDate()) {
                        this.DueDateColor = 'red';
                  } else {
                        this.DueDateColor = environment.colors.buttonBackground;
                  }
            }
      }

      //#endregion

}
