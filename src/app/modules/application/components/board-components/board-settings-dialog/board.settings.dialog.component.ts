import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from 'src/app/shared/store/state/app.state';
import { IBoard, ICardItem, ICheckList } from 'src/app/shared/models/boards';
import { IUser } from 'src/app/shared/models/user';
import { MatSelectChange } from '@angular/material/select';
import { UpdateUserBoardPermission } from 'src/app/shared/store/actions/user.actions';
import { MatTableDataSource } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { AddBoardMember } from 'src/app/shared/store/actions/board.actions';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { priorities, IPriority } from 'src/app/shared/models/priorities';

@Component({
    selector: 'board-settings-dialog',
    templateUrl: './board.settings.dialog.html',
    styleUrls: ['../../../styles/board.component.scss', '../../../styles/common.scss']
})
export class BoardSettingsDialogComponent implements OnInit {

      //#region Members

      @Input() board: IBoard;
      cards: ICardItem[];

      daylyTasks: string;
      weeklyOverview: string;
      weeklyOverviewData: any;
      weeklyOverviewOptions: any;
      taskDistribution: string;
      taskDistributionType: string;
      taskDistributionData: any;
      taskDistributionOptions: any;
      taskDistributionClosed: number;

      displayedColumns: string[];
      dataSource: MatTableDataSource<IUser>;

      emailFormControl: FormControl;
      optionalFormControl: FormControl;

      canReturn: boolean;

      //#endregion

      //#region Constructor

      constructor(
            private _store: Store<IAppState>,
            public translate: TranslateService
      ) {
            this.weeklyOverviewOptions = {
                  legend: {
                        position: 'bottom'
                  },
                  scales: {
                        xAxes: [{
                              stacked: true,
                              gridLines: {
                                    display: false,
                                    drawBorder: false
                              }
                        }],
                        yAxes: [{
                              stacked: true,
                              gridLines: {
                                    display: false,
                                    drawBorder: false
                              },
                              ticks: {
                                    beginAtZero: true,
                                    precision: 0
                             }
                        }]
                  }
            };
            this.taskDistributionOptions = {
                  legend: {
                        position: 'left'
                  }
            };
      }

      ngOnInit() {
            this.daylyTasks = '0';
            this.weeklyOverview = '0';
            this.taskDistribution = 'none';
            this.taskDistributionType = 'priority';

            if (localStorage.getItem('language') === 'en') {
                  this.weeklyOverviewData = {
                        labels: [
                              this.translate.instant('APPLICATION.Common.Date.Sunday'),
                              this.translate.instant('APPLICATION.Common.Date.Monday'),
                              this.translate.instant('APPLICATION.Common.Date.Tuesday'),
                              this.translate.instant('APPLICATION.Common.Date.Wednesday'),
                              this.translate.instant('APPLICATION.Common.Date.Thursday'),
                              this.translate.instant('APPLICATION.Common.Date.Friday'),
                              this.translate.instant('APPLICATION.Common.Date.Saturday')
                        ],
                        datasets: []
                  };
            } else {
                  this.weeklyOverviewData = {
                        labels: [
                              this.translate.instant('APPLICATION.Common.Date.Monday'),
                              this.translate.instant('APPLICATION.Common.Date.Tuesday'),
                              this.translate.instant('APPLICATION.Common.Date.Wednesday'),
                              this.translate.instant('APPLICATION.Common.Date.Thursday'),
                              this.translate.instant('APPLICATION.Common.Date.Friday'),
                              this.translate.instant('APPLICATION.Common.Date.Saturday'),
                              this.translate.instant('APPLICATION.Common.Date.Sunday')
                        ],
                        datasets: []
                  };
            }
            this.weeklyOverviewData.datasets = [{
                        label: this.translate.instant('APPLICATION.Boards.SettingsDialog.Stats.Created'),
                        backgroundColor: 'rgb(66, 191, 247)',
                        borderColor: 'transparent',
                        data: []
                  },
                  {
                        label: this.translate.instant('APPLICATION.Boards.SettingsDialog.Stats.Closed'),
                        backgroundColor: 'rgb(198, 236, 253)',
                        borderColor: 'transparent',
                        data: []
                  }
            ];


            this.board.settings.users.forEach((user: IUser) => {
                  this.getUserPermission(user);
            });

            this.dataSource = new MatTableDataSource(this.board.settings.users);
            this.displayedColumns = ['avatar', 'name', 'company', 'position', 'email', 'phone', 'permission'];
            this.cards = new Array<ICardItem>();
            this.board.lists.map(m => m.cards).forEach((listcards: ICardItem[]) => {
                  this.cards.push.apply(this.cards, listcards);
            });
            this.setWeeklyOverviewData(this.weeklyOverview);
            this.setTaskDistributionDate(this.taskDistribution, this.taskDistributionType);

            this.emailFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/)]);
            this.optionalFormControl = new FormControl('');

            this.canReturn = false;
      }

      //#endregion

      //#region Functions - Dashboard

      getDueTasks(mode: string): number {
            const date = new Date();
            switch (mode) {
                  case 'dueTasks':
                        if (this.daylyTasks === '-1') {
                              date.setDate(date.getDate() - 1);
                        } else if (this.daylyTasks === '1') {
                              date.setDate(date.getDate() - 1);
                        }
                        return this.cards.filter(m => m.dueDate && m.dueDate.date && this.isSameDay(m.dueDate.date, date)).length;
                  case 'dueTasksCompleted':
                        if (this.daylyTasks === '-1') {
                              date.setDate(date.getDate() - 1);
                        } else if (this.daylyTasks === '1') {
                              date.setDate(date.getDate() - 1)
                        }
                        return this.cards.filter(m => (m.dueDate && m.dueDate.date && m.dueDate.done && this.isSameDay(m.dueDate.date, date)) &&
                               this.areCheckitemsCompleted(m.checklists)).length;
                  case 'overdue':
                        return this.cards.filter(m => m.dueDate && m.dueDate.date && m.dueDate.date < date &&
                              (!m.dueDate.done || !this.areCheckitemsCompleted(m.checklists))).length;
                  case 'overdueYesterday':
                        date.setDate(date.getDate() - 1);
                        return this.cards.filter(m => m.dueDate && m.dueDate.date && this.isSameDay(m.dueDate.date, date) &&
                              (!m.dueDate.done || !this.areCheckitemsCompleted(m.checklists))).length;
                  case 'open':
                        return this.cards.filter(m => (m.dueDate && !m.dueDate.done) || !this.areCheckitemsCompleted(m.checklists)).length;
                  case 'completedToday':
                        return this.cards.filter(m => m.dueDate && m.dueDate.done && m.dueDate.completedAt && this.isSameDay(m.dueDate.completedAt, date) &&
                              this.areCheckitemsCompleted(m.checklists)).length;
                  case 'undefined':
                        return this.cards.filter(m => !m.dueDate || !m.dueDate.date).length;
            }
      }

      isSameDay(date1: Date, date2: Date): boolean {
            return date1.getFullYear() === date2.getFullYear() &&
                  date1.getMonth() === date2.getMonth() &&
                  date1.getDate() === date2.getDate();
      }

      areCheckitemsCompleted(checklists: ICheckList[]): boolean {
            if (checklists !== undefined) {
                  let checked = 0, total = 0;
                  checklists.forEach((checklist: ICheckList) => {
                        total = total + checklist.checkitems.length;
                        checked = checked + checklist.checkitems.filter(m => m.checked).length;
                  });
                  if (checked === total) {
                        return true;
                  } else {
                        return false;
                  }
            } else {
                  return true;
            }
      }

      setWeeklyOverviewData(week: string): void {
            const date = moment.utc().week(moment().week() - +week).hours(0).minutes(0).seconds(0).milliseconds(0);
            const addedTasks: number[] = [];
            const closedTasks: number[] = [];

            this.weeklyOverviewData.labels.forEach((day: string) => {
                  date.day(day);
                  addedTasks.push(this.cards.filter(m => this.isSameDay(m.createdAt, date.toDate())).length);
                  closedTasks.push(this.cards.filter(m => m.dueDate && m.dueDate.done && m.dueDate.completedAt &&
                        this.isSameDay(m.dueDate.completedAt, date.toDate()) && this.areCheckitemsCompleted(m.checklists)).length);
            });

            const newData = {
                  labels: this.weeklyOverviewData.labels,
                  datasets: this.weeklyOverviewData.datasets
            };
            newData.datasets[0].data = addedTasks;
            newData.datasets[1].data = closedTasks;

            this.weeklyOverviewData = newData;
      }

      setTaskDistributionDate(weekFilter: string, type: string): void {
            let date = moment.utc();
            if (weekFilter !== 'none') {
                  date = moment.utc().week(date.week() - +weekFilter).hours(0).minutes(0).seconds(0).milliseconds(0);
            }

            let newData = {};
            if (type === 'priority') {
                  const labels: string[] = [];
                  const data: number[] = [];
                  const colors: string[] = [];

                  priorities.forEach((priority: IPriority) => {
                        labels.push(this.translate.instant(priority.name));
                        if (priority.color === 'transparent') {
                              colors.push('lightgray');
                        } else {
                              colors.push(priority.color);
                        }
                        if (weekFilter === 'none') {
                              data.push(this.cards.filter(m => m.priority === priority.priority).length);
                        } else {
                              data.push(this.cards.filter(m => m.priority === priority.priority && date.isSame(m.createdAt, 'week')).length);
                        }
                  });

                  newData = {
                        labels: labels,
                        datasets: [{
                              data: data,
                              backgroundColor: colors,
                              hoverBackgroundColor: colors
                        }]
                  };

                  if (weekFilter === 'none') {
                        this.taskDistributionClosed = this.cards.filter(m => m.dueDate && m.dueDate.done && this.areCheckitemsCompleted(m.checklists)).length;
                  } else {
                        this.taskDistributionClosed = this.cards.filter(m => m.dueDate && m.dueDate.completedAt && date.isSame(m.dueDate.completedAt, 'week') &&
                              this.areCheckitemsCompleted(m.checklists)).length;
                  }
            }

            this.taskDistributionData = newData;
      }

      getTotalValue(array: number[]): number {
            return array.reduce((a, b) => a + b, 0);
      }

      //#endregion

      //#region Functions - Team Members

      addUser(): void {
            this.emailFormControl.setValue((<string>this.emailFormControl.value).toLocaleLowerCase().trim());
            if (this.emailFormControl.valid && !this.board.settings.users.some(m => m.email === this.emailFormControl.value)) {
                  this._store.dispatch(new AddBoardMember({id: this.board._id, email: this.emailFormControl.value, optional: (<string>this.optionalFormControl.value).trim()}));

                  this.canReturn = true;
                  this.emailFormControl.setValue('');
                  this.optionalFormControl.setValue('');

                  this.delay(1000).then( () => {
                        this.dataSource.data = this.board.settings.users;
                  });
            }
      }

      getUserPermission(user: IUser): void {
            const index = user.boards.findIndex(m => m._id === this.board._id);
            if (user.boards[index].settings.role === 'manager') {
                  user.tempRole = 'manager';
            } else if (user.boards[index].settings.role === 'admin') {
                  user.tempRole = 'admin';
            } else if (user.boards[index].settings.role === 'member') {
                  user.tempRole = 'member';
            } else {
                  user.tempRole = undefined;
            }
      }

      applyFilter(filterValue: string): void {
            this.dataSource.filter = filterValue.trim().toLowerCase();
      }

      changeUserPermission(event: MatSelectChange, userId: number): void {
            this._store.dispatch(new UpdateUserBoardPermission({id: this.board._id, userId: userId, role: event.value}));
      }

      changeUserPermissionDisabled(role: string): boolean {
            if (role !== 'member' && this.board.settings.users.length - this.board.settings.users.filter(m => m.tempRole === 'member').length === 1) {
                  return true;
            } else {
                  return false;
            }
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

      async delay(ms: number) {
            await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => {});
      }

      //#endregion

}
