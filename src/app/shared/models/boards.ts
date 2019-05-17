import { IColor, Colors } from './colors';
import { IUser } from './user';
import { Time } from '@angular/common';

//#region Board

export interface IBoard {
      _id: number;
      name: string;
      lists: Array<ICardList>;
      createdAt: Date;
      modifiedAt: Date;
      version: number;
      projectId: number;
      settings: IBoardSettings;
}

export interface IBoardSettings {

      mode: string;
      colorLight: string;
      colorDark: string;
      starred: boolean;
      group: IUser[];
      users: IUser[];
}

//#endregion

//#region List of Cards

export interface ICardList {
      _id: number;
      name: string;
      cards: Array<ICardItem>;
      createdAt: Date;
      modifiedAt: Date;
      version: number;
      position: number;
      boardId: number;
}

//#endregion

//#region Card

export interface ICardItem {
      _id: number;
      name: string;
      position: number;
      createdAt: Date;
      modifiedAt: Date;
      version: number;
      cardListId: number;

      users: IUser[];
      priority: number;
      dueDate: IDueDate;
      attachments: IAttachment[];
      checklists: ICheckList[];
      worksegments: IWorkSegment[];
      messages: IMessage[];

}

export interface IDueDate {
      date: Date;
      remindAt: Number;
      done: Boolean;
}

export interface IAttachment {
      _id: Number;
      name: String;
      dataType: String;
      userName: String;
      link: String;
      date: Date;
}

export interface ICheckList {
      _id: number;
      name: string;
      checkitems: ICheckItem[];
      hideCompleted: boolean;
}

export interface ICheckItem {
      _id: number;
      name: string;
      checked: boolean;
      position: number;
}

export interface IMessage {
      _id: number;
      cardId: number;
      userId: number;
      priority: number;
      date: Date;
      text: string;
      edited: boolean;
}

//#endregion

//#region Timesheet

// https://stackoverflow.com/questions/3282403/database-schema-for-timesheet

export interface IProject {
      _id: number;
      name: string;
      projectId: string;
}

export interface ISubProject {
      _id: number;
      projectId: number;
      name: string;
}

export interface IWorkSegment {
      _id: number;
      subProjectId: number;
      userId: number;
      payrollCycleId: number;
      date: Date;
      start: Time;
      end: Time;
      total: number;
      comment: string;
}

export interface ITimeSheet {
      _id: number;
      userId: number;
      payrollCycleId: number;
}

export interface ITimeSheetSegment {
      _id: number;
      subProjectId: number;
      userId: number;
      payrollCycleId: number;
}

export interface IApproval {
      _id: number;
      timeSheetId: number;
      payrollCycleId: number;
      submitedTime: Date;
      approvedBy: number;
      approvedTime: Date;
}

export interface IPayrollCycle {
      _id: number;
      year: number;
      number: number;
      start: Date;
      end: Date;
      deposit: Date;
      check: Date;
      total: number;
}

//#endregion
