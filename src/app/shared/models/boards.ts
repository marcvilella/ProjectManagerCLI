import { IColor, Colors } from './colors';
import { IUser } from './user';

//#region Board

export interface IBoard {

      _id: number;
      name: string;
      lists: Array<CardList>;
      createdAt: Date;
      modifiedAt: Date;
      version: number;
      settings: BoardSettings;

      addCardList(list: CardList): void;
}

export class Board implements IBoard {

      _id: number;
      name: string;
      lists: Array<CardList>;
      createdAt: Date;
      modifiedAt: Date;
      version: number;

      settings: BoardSettings;

      constructor(name: string) {
            // this.id = 0;
            this._id = Math.floor(Math.random() * 10000);
            this.name = name;
            this.lists = new Array<CardList>();
            this.createdAt = new Date();
            this.modifiedAt = new Date();
            this.version = 1;

            this.settings = new BoardSettings();
      }

      addCardList(list: CardList): void {
            this.lists.push(list);
      }
}

export interface IBoardSettings {

      mode: string;
      colorLight: string;
      colorDark: string;
      starred: boolean;
      group: IUser[];
      users: IUser[];
}

export class BoardSettings implements IBoardSettings {

      mode: string;
      color: IColor;
      group: IUser[];
      users: IUser[];
      starred: boolean;
      colorLight: string;
      colorDark: string;

      constructor() {

            this.mode = 'private';
            this.color = Colors[0];
            this.group = null;
            this.users = null;
      }

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
      priority: number;
      boardId: number;

      sortBy(option: number): void;
}

export class CardList implements ICardList {
      _id: number;
      name: string;
      cards: Array<CardItem>;
      createdAt: Date;
      modifiedAt: Date;
      version: number;
      priority: number;
      boardId: number;

      constructor(name: string, cards: Array<CardItem> = new Array<CardItem>()) {
            // this.id = 0;
            this._id = Math.floor(Math.random() * 10000);
            this.name = name;
            this.cards = cards;
            this.createdAt = new Date();
            this.modifiedAt = new Date();
            this.priority = 0;
            this.version = 1;
      }

      public sortBy(option: number): void {
            switch (option) {
                  // Alphabetically
                  case 0:
                  this.cards = this.cards.sort((obj1, obj2) => {
                        if (obj1.name.toLocaleLowerCase() > obj2.name.toLocaleLowerCase()) {
                              return 1;
                        }
                        if (obj1.name.toLocaleLowerCase() < obj2.name.toLocaleLowerCase()) {
                              return -1;
                        }
                        return 0;
                  });
                  break;
                  // CreatedOn
                  case 1:
                  this.cards = this.cards.sort((obj1, obj2) => {
                        if (obj1.createdAt > obj2.createdAt) {
                              return 1;
                        }
                        if (obj1.createdAt < obj2.createdAt) {
                              return -1;
                        }
                        return 0;
                  });
                  break;
                  case 2:
                  this.cards = this.cards.sort((obj1, obj2) => {
                        if (obj1.createdAt < obj2.createdAt) {
                              return 1;
                        }
                        if (obj1.createdAt < obj2.createdAt) {
                              return -1;
                        }
                        return 0;
                  });
                  break;
                  // UpdatedOn
                  case 3:
                  this.cards = this.cards.sort((obj1, obj2) => {
                        if (obj1.modifiedAt > obj2.modifiedAt) {
                              return 1;
                        }
                        if (obj1.modifiedAt < obj2.modifiedAt) {
                              return -1;
                        }
                        return 0;
                  });
                  break;
                  case 4:
                  this.cards = this.cards.sort((obj1, obj2) => {
                        if (obj1.modifiedAt < obj2.modifiedAt) {
                              return 1;
                        }
                        if (obj1.modifiedAt > obj2.modifiedAt) {
                              return -1;
                        }
                        return 0;
                  });
                  break;
            }
      }
}

//#endregion

//#region Card

export interface ICardItem {
      _id: number;
      name: string;
      priority: number;
      createdAt: Date;
      modifiedAt: Date;
      version: number;
      cardListId: number;
}

export class CardItem implements ICardItem {
      _id: number;
      name: string;
      priority: number;
      createdAt: Date;
      modifiedAt: Date;
      version: number;
      cardListId: number;

      constructor(name: string) {
            // this.id = 0;
            this._id = Math.floor(Math.random() * 10000);
            this.name = name;
            this.priority = 0;
            this.createdAt = new Date();
            this.modifiedAt = new Date();
            this.version = 1;
      }
}

//#endregion
