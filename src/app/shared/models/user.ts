import { IBoard } from './boards';

export class User implements IUser{
    
    _id: number;
    name: string;
    surname: string;
    fullname: string;
    email: string;
    company: string;
    password: string;
    role: string;
    image: string;
    boards: IBoard[];
    
    constructor( id: number, name: string, surname: string, fullname: string, email: string, company: string, role: string, image: string){
        this._id = id;
        this.name = name;
        this.surname = surname;
        this.fullname = fullname;
        this.email = email;
        this.company = company;
        this.role = role;
        this.image = image;
    }
}

export interface IUser{
    _id: number,
    name: string,
    surname: string,
    fullname: string,
    email: string,
    company: string,
    password: string,
    role: string,
    image: string,
    boards: IBoard[]
}