import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MyDatePipe } from 'src/app/shared/modules/pipes';
import { MenuItem } from 'primeng/components/common/menuitem';
import { HelperService } from 'src/app/shared/services/helper.service';
import { IWorkSegment } from 'src/app/shared/models/timesheet';

@Component({
  selector: 'timesheet-weekly-insert',
  templateUrl: './timesheet.weekly.insert.html',
  styleUrls: ['../../../styles/common.scss'],
  providers: [MyDatePipe]
})
export class TimesheetWeeklyInsertComponent implements OnInit {

      //#region Members

      @Input() worksegments: IWorkSegment[];

      localWorkSegments: IWorkSegment[];
      weekCols: IColumn[];
      weekData: IRow[];
      selectedDataRow: IRow;

      contextItems: MenuItem[];

      startWeek: string;
      currentWeek: number;
      showWeek: number;

      dateTransformer: MyDatePipe;
      hasChanges: boolean;

      //#endregion

      //#region Constructor

      constructor(
            private helper: HelperService
      ) {
            if (localStorage.getItem('language') === 'en') {
                  this.startWeek = 'Sunday';
            } else {
                  this.startWeek = 'Monday';
            }

            this.contextItems = [
                  { label: 'Copy Row', icon: 'pi pi-copy', command: (event) => this.hasChanges = false },
                  { label: 'Paste Row', icon: 'pi pi-paste', command: (event) => this.hasChanges = false },
                  { label: 'Delete Row', icon: 'pi pi-times', command: (event) => this.hasChanges = false }
              ];
      }

      ngOnInit() {

            if (this.worksegments !== undefined) {
                  this.localWorkSegments = this.helper.deepCopy(this.worksegments);
            } else {
                  this.localWorkSegments = new Array<IWorkSegment>();
                  this.localWorkSegments.push({
                        _id: 0,
                        subProjectId: 0,
                        userId: 0,
                        payrollCycleId: 0,
                        date: moment.utc().hours(0).minutes(0).seconds(0).milliseconds(0).toDate(),
                        start: { hours: 0, minutes: 0 },
                        end: { hours: 0, minutes: 0 },
                        total: 2.5,
                        comment: null
                  });
                  this.localWorkSegments.push({
                        _id: 0,
                        subProjectId: 0,
                        userId: 0,
                        payrollCycleId: 0,
                        date: moment.utc().day(this.startWeek).hours(0).minutes(0).seconds(0).milliseconds(0).toDate(),
                        start: { hours: 0, minutes: 0 },
                        end: { hours: 0, minutes: 0 },
                        total: 5,
                        comment: null
                  });
                  this.localWorkSegments.push({
                        _id: 0,
                        subProjectId: 0,
                        userId: 2,
                        payrollCycleId: 0,
                        date: moment.utc().day(this.startWeek).hours(0).minutes(0).seconds(0).milliseconds(0).toDate(),
                        start: { hours: 0, minutes: 0 },
                        end: { hours: 0, minutes: 0 },
                        total: 5,
                        comment: null
                  });
            }
            this.worksegments = this.helper.deepCopy(this.localWorkSegments);

            this.currentWeek = moment().week();
            this.getWeek(this.currentWeek);
      }


      //#endregion

      //#region Functions

      getWeek(week: number): void {
            this.showWeek = week;
            this.weekCols = this.getWeekCols(this.showWeek);
            this.weekData = this.getWeekData(this.weekCols, 'userId');
            this.addTotalsColumn(this.weekCols, this.weekData, true);
            this.addTotalsRow(this.weekCols, this.weekData);
      }

      getWeekCols(week: number): IColumn[] {

            const weekCols = new Array<IColumn>();
            const date = moment.utc().week(week).day(this.startWeek).hours(0).minutes(0).seconds(0).milliseconds(0);

            for (let i = 'a'; i !== 'h'; i = this.nextLetter(i)) {
                  weekCols.push({
                        field: i,
                        header: date.toDate(),
                        settings: {}
                  });
                  date.add(1, 'day');
            }

            return weekCols;
      }

      getWeekData(weekCols: IColumn[], rowFilter: string): IRow[] {

            const weekRows = new Array<IRow>();

            this.helper.groupBy(this.localWorkSegments, rowFilter).forEach((groupWorkSegments: IWorkSegment[]) => {
                  const rowColumns: IRow = {};
                  weekCols.forEach((column: IColumn) => {
                        const localWorkSegment = groupWorkSegments.find(m => m.date.toUTCString() === column.header.toUTCString());
                        if (localWorkSegment !== undefined) {
                              rowColumns[column.field] = {
                                    data: localWorkSegment,
                                    text: localWorkSegment.total,
                                    settings: {
                                          type: 'number',
                                          max: '12',
                                          min: '0',
                                          step: '0.25'
                                    }
                              };
                        } else {
                              rowColumns[column.field] = {
                                    data: undefined,
                                    text: undefined,
                                    settings: {
                                          type: 'number',
                                          max: '12',
                                          min: '0',
                                          step: '0.25'
                                    }
                              };
                              if (column.header > new Date) {
                                    rowColumns[column.field].settings.editable = false;
                              }
                        }
                  });
                  rowColumns['0'] = {
                        data: groupWorkSegments[0].userId,
                        text: undefined,
                        settings: { }
                  };
                  weekRows.push(rowColumns);
            });

            return weekRows;
      }

      onInputChange(rowIndex: number, columnField: string) {
            // Reconvert to 0.25 multiplier
            this.weekData[rowIndex][columnField].text = Math.round(+this.weekData[rowIndex][columnField].text * 4) / 4;

            // Update current object or create new WorkSegment
            if (this.weekData[rowIndex][columnField].data !== undefined) {
                  this.weekData[rowIndex][columnField].data.total = +this.weekData[rowIndex][columnField].text;
            } else {
                  this.localWorkSegments.push({
                        _id: 0,
                        subProjectId: 0,
                        userId: this.weekData[rowIndex]['0'].data,
                        payrollCycleId: 0,
                        date: this.weekCols.find(m => m.field === columnField).header,
                        start: { hours: 0, minutes: 0 },
                        end: { hours: 0, minutes: 0 },
                        total: +this.weekData[rowIndex][columnField].text,
                        comment: null
                  });
                  this.weekData[rowIndex][columnField].data = this.localWorkSegments[this.localWorkSegments.length - 1];
            }

            // Update Has Changes
            this.hasChanges = !this.helper.equals(this.worksegments, this.localWorkSegments);
      }

      // Possible Common
      nextLetter(columnHeader: string): string {
            switch (columnHeader.substring(columnHeader.length - 1)) {
                  case 'z':
                  return columnHeader.substr(0, columnHeader.length - 1) + 'A';
                  case 'Z':
                  return columnHeader + 'a';
                  default:
                  return columnHeader.substring(0, columnHeader.length - 1)
                        + String.fromCharCode(columnHeader.charCodeAt(columnHeader.length - 1) + 1);
            }
      }

      // Possible Common
      addAvatarColumn(weekCols: IColumn[], weekData: IRow[]) {
            weekCols.unshift({
                  field: '2',
                  header: undefined,
                  settings: {}
            });
            this.helper.groupBy(this.localWorkSegments, 'userId').forEach((groupWorkSegments: IWorkSegment[], index: number) => {
                  console.log(index);
                  weekData[index]['2'] = {
                        data: groupWorkSegments[0].userId,
                        text: undefined,
                        settings: {
                              class: 'non-editable-cell bold',
                              editable: false
                        }
                  };
            });
      }

      // Possible Common
      addTotalsRow(weekCols: IColumn[], weekData: IRow[]): void {
            const rowColumns: IRow = {};
            weekCols.forEach((column: IColumn) => {
                  rowColumns[column.field] = {
                        data: undefined,
                        text: weekData.filter(m => m[column.field].text !== undefined).reduce((a, b) => a + +b[column.field].text, 0),
                        settings: {
                              editable: false
                        }
                  };
            });
            rowColumns['0'] = {
                  data: this.helper.generateRandom(),
                  text: undefined,
                  settings: {
                        class: 'non-editable-cell bold',
                        selectable: false
                  }
            };
            weekData.push(rowColumns);
      }

      // Possible Common
      addTotalsColumn(weekCols: IColumn[], weekData: IRow[], beggining: boolean): void {
            // const field = this.nextLetter(weekCols[weekCols.length - 1].field);
            if (beggining) {
                  weekCols.unshift({
                        field: '1',
                        header: undefined,
                        settings: {
                              class: 'header-left-transparent'
                        }
                  });
            } else {
                  weekCols.push({
                        field: '1',
                        header: undefined,
                        settings: {
                              class: 'header-right-transparent'
                        }
                  });
            }
            weekData.forEach((row: IRow) => {
                  let total = 0;
                  Object.keys(row).forEach((columnField: string) => {
                        if (row[columnField].text !== undefined) {
                              total = total + +row[columnField].text;
                        }
                  });
                  row['1'] = {
                        data: undefined,
                        text: total,
                        settings: {
                              class: 'non-editable-cell bold',
                              editable: false
                        }
                  };
            });
      }

      // Possible Common
      updateTotalsRow(columnField: string) {
            this.weekData[this.weekData.length - 1][columnField].text =
                  (this.weekData.filter(m => m[columnField].text !== undefined).reduce((a, b) => a + +b[columnField].text, 0)
                  - +this.weekData[this.weekData.length - 1][columnField].text);

            if (this.weekData[this.weekData.length - 1]['1'] !== undefined) {
                  this.updateTotalsColumn(this.weekData.length - 1);
            }
      }

      // Possible Common
      updateTotalsColumn(rowIndex: number) {
            let total = 0;

            // TODO: Change this to not do what string contains numbers
            Object.keys(this.weekData[rowIndex]).forEach((columnField: string) => {
                  if (columnField !== '1' && this.weekData[rowIndex][columnField].text !== undefined) {
                        total = total + +this.weekData[rowIndex][columnField].text;
                  }
            });

            this.weekData[rowIndex]['1'].text = total;
      }

      //#endregion
}

// Specials fields names
// - '0': Row settings
// - '1': Total sum up of row into Column
// - '2': Avatar and name
export interface IColumn {
      field: string;
      header: any;
      settings: {
            class?: string;
            width?: string;
      };
}

// Row settings at Key '0'
export interface IRow {
      [key: string]: {
            data: any;
            text: any;
            settings: {
                  class?: string;
                  selectable?: boolean;
                  editable?: boolean;
                  width?: string;
                  type?: string;
                  min?: string;
                  max?: string;
                  step?: string;
            };
      };
}
