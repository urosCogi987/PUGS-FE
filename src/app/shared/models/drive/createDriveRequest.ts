export interface ICreateDriveRequest {
    fromAddress : string;
    toAddress : string;
    distance: number;
    estimatedDuration: number;
}