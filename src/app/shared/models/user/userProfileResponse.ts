export interface IUserProfileResponse {
    username: string,
    email: string,
    name: string,
    surname: string,
    address: string,
    dateOfBirth: Date,
    roleNames: string[],
    status: string
}