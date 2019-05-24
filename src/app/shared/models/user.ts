import { IBoard } from './boards';

export interface IUser {
    _id: number;
    name: string;
    surname: string;
    fullname: string;
    email: string;
    company: string;
    position: string;
    password: string;
    role: string;
    image: string;
    boards: IBoard[];
}
