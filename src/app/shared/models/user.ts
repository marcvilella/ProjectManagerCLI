export class User{
    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public fullname: string,
        public email: string,
        public company: string,
        public role: string,
        public image: string
    ){}
}

// export interface User{
//     id: string,
//     name: string,
//     surname: string,
//     fullname: string,
//     email: string,
//     company: string,
//     password: string,
//     role: string,
//     image: string
// }