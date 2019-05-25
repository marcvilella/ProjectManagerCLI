import { IUser } from './user';
import { IWorkSegment } from './timesheet';
import { IMessage } from './message';

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
      users: IUser[];

      starred: boolean;
      role: string;
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

      description: string;
      watching: boolean;
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
      remindAt: number;
      done: boolean;
}

export interface IAttachment {
      _id: number;
      userId: number;
      userName?: string;
      name: string;
      dataType: string;
      value: string;
      date: Date;
}

export interface ICheckList {
      _id: number;
      name: string;
      checkitems: ICheckItem[];
      hide: boolean;
}

export interface ICheckItem {
      _id: number;
      name: string;
      checked: boolean;
}

//#endregion
