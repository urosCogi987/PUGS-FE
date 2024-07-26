export interface IChangePasswordRequest {
    password: string;
    repeatPassword: string;
    oldPassword: string;
}