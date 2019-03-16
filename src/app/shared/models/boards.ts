import { IColor, Colors } from './colors';
import { IUser } from './user';

//#region Board

export class Board implements IBoard{
      
      _id: number;
      name: string;
      lists: Array<CardList>;
      createdOn: Date;
      modifiedOn: Date;
      version: number;

      settings: BoardSettings;

      constructor(name: string){
            //this.id = 0;
            this._id = Math.floor(Math.random() * 10000);
            this.name = name;
            this.lists = new Array<CardList>();
            this.createdOn = new Date();
            this.modifiedOn = new Date();
            this.version = 1;

            this.settings = new BoardSettings();
      }

      addCardList(list: CardList): void{
            this.lists.push(list);
      }
}

export interface IBoard{
      
      _id: number;
      name: string;
      lists: Array<CardList>;
      createdOn: Date;
      modifiedOn: Date;
      version: number;
      settings: BoardSettings;

      addCardList(list: CardList): void;
}

export class BoardSettings implements IBoardSettings{

      mode: string;
      color: IColor;
      group: IUser[];
      users: IUser[];

      userSettings: BoardSettingsUser;
      
      constructor(){

            this.mode = 'private';
            this.color = Colors[0];
            this.group = null;
            this.users = null;

            this.userSettings = new BoardSettingsUser();
      }

}

export interface IBoardSettings{
      
      mode: string;
      color: IColor;
      group: IUser[];
      users: IUser[];

      userSettings: BoardSettingsUser;
}


export class BoardSettingsUser implements IBoardSettingsUser{

      starred: boolean;
      
      constructor(){
            this.starred = false;
      }

}

export interface IBoardSettingsUser{
      
      starred: boolean;

}

//#endregion

//#region List of Cards

export class CardList implements ICardsList{
      id: number;
      name: string;
      cards: Array<Card>;
      createdOn: Date;
      modifiedOn: Date;
      version: number;
      isListEditable: boolean;
      isCardAddible: boolean;

      constructor(name: string, cards: Array<Card> = new Array<Card>()){
            //this.id = 0;
            this.id = Math.floor(Math.random() * 10000);
            this.name = name;
            this.cards = cards;
            this.createdOn = new Date();
            this.modifiedOn = new Date();
            this.version = 1;
            this.isListEditable = false;
            this.isCardAddible = false;
      }

      public sortBy(option:number): void{
            switch(option){
                  //Alphabetically
                  case 0:
                  this.cards = this.cards.sort((obj1, obj2) => {
                        if (obj1.name.toLocaleLowerCase() > obj2.name.toLocaleLowerCase()) 
                              return 1;
                        if (obj1.name.toLocaleLowerCase() < obj2.name.toLocaleLowerCase())
                              return -1;
                        return 0;
                  });
                  break;
                  //CreatedOn
                  case 1:
                  this.cards = this.cards.sort((obj1, obj2) => {
                        if (obj1.createdOn > obj2.createdOn) 
                              return 1;
                        if (obj1.createdOn < obj2.createdOn)
                              return -1;
                        return 0;
                  });
                  break;
                  case 2:
                  this.cards = this.cards.sort((obj1, obj2) => {
                        if (obj1.createdOn < obj2.createdOn) 
                              return 1;
                        if (obj1.createdOn < obj2.createdOn)
                              return -1;
                        return 0;
                  });
                  break;
                  //UpdatedOn
                  case 3:
                  this.cards = this.cards.sort((obj1, obj2) => {
                        if (obj1.modifiedOn > obj2.modifiedOn) 
                              return 1;
                        if (obj1.modifiedOn < obj2.modifiedOn)
                              return -1;
                        return 0;
                  });
                  break;
                  case 4:
                  this.cards = this.cards.sort((obj1, obj2) => {
                        if (obj1.modifiedOn < obj2.modifiedOn) 
                              return 1;
                        if (obj1.modifiedOn > obj2.modifiedOn)
                              return -1;
                        return 0;
                  });
                  break;
            }
      }
}

export interface ICardsList{
      id: number;
      name: string;
      cards: Array<Card>;
      createdOn: Date;
      modifiedOn: Date;
      isListEditable: boolean;
      isCardAddible: boolean;

      sortBy(option: number): void;
}

//#endregion

//#region Card

export class Card implements ICard{
      id: number;
      name: string;
      createdOn: Date;
      modifiedOn: Date;
      version: number;

      constructor(name: string){
            //this.id = 0;
            this.id = Math.floor(Math.random() * 10000);
            this.name = name;
            this.createdOn = new Date();
            this.modifiedOn = new Date();
            this.version = 1;
      }
}

export interface ICard{
      id: number;
      name: string;
      createdOn: Date;
      modifiedOn: Date;
      version: number;
}

//#endregion