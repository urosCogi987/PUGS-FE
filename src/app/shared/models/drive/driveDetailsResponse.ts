export interface IDriveDetailsResponse {
    id: string;
    userUsername: string;
    driverUsername: string;    
    fromAddress: string;
    toAddress: string;
    driveTime: number;
    driverArrivingTime: number;
    distance: number;
    price: number;
    createdOn: Date;
    status: string;
    driverRating: number;
}