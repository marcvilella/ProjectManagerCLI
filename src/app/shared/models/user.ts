import { IBoard } from './boards';

export interface IUser {
    _id: number;
    name: string;
    surname: string;
    fullname: string;
    email: string;
    company: string;
    position: string;
    phone: string;
    password: string;
    image: string;
    boards: IBoard[];

    tempRole: string;
}
