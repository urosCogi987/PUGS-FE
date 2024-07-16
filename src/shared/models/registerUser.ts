export class RegisterUser {
    constructor(public username : string,                 
                public name : string,
                public surname: string,
                public address: string,
                public dateOfBirth: Date,
                public password: string,
                public repeatPassword: string,                
                public roleName: string,
                public email : string,) {    
    }
}