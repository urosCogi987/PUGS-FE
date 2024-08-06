import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/env.const";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "../authentication/authentication.service";
import { ICreateDriveRequest } from "../../models/drive/createDriveRequest";
import { ICreatedDriveResponse } from "../../models/drive/createdDriveResponse";
import { IDriveListItemResponse } from "../../models/drive/driveListItemResponse";
import { IDriveDetailsResponse } from "../../models/drive/driveDetailsResponse";

@Injectable({
    providedIn: 'root',
})
export class DriveService {

    constructor(
        private http: HttpClient,
        private authService: AuthenticationService
    ) {}

    private getStandardOptions() : {headers: HttpHeaders}
    {
      return {
        headers: new HttpHeaders({            
          'Authorization': `Bearer ${this.authService._accessToken}`
        })
      };
    }   

    public createDrive(
        body: ICreateDriveRequest           
      ): Observable<ICreatedDriveResponse> {        
        const createDriveUrl = `${environment.apiBase}/${environment.apiDrive}`;
        var headers = this.getStandardOptions();      
  
        return this.http
          .post<ICreatedDriveResponse>(createDriveUrl, body, headers)
          .pipe(
            tap((response) => {
              console.log(response);
              return response;
            })
          );
      }

    public confirmDrive(
      id: string
    ): Observable<any> {
      const confirmDriveUrl = `${environment.apiBase}/${environment.apiDrive}/${id}/confirm`;
      var headers = this.getStandardOptions();

      return this.http
        .put(confirmDriveUrl, null, headers)
        .pipe(
          tap((response) => {
            console.log(response);
            return response; //?
          })
        );
    }

    public getDrivesForUser(): Observable<IDriveListItemResponse[]> {
      const driveListUrl = `${environment.apiBase}/${environment.apiDrive}`;
      var headers = this.getStandardOptions();

      return this.http
        .get<IDriveListItemResponse[]>(driveListUrl, headers)
        .pipe(
          tap((response) => {
            console.log(response);
            return response;
          })
        );
    }

    public getDrives(): Observable<IDriveListItemResponse[]> {
      const driveListUrl = `${environment.apiBase}/${environment.apiDrive}/new`;
      var headers = this.getStandardOptions();

      return this.http
        .get<IDriveListItemResponse[]>(driveListUrl, headers)
        .pipe(
          tap((response) => {
            console.log(response);
            return response;
          })
        );
    }

    public driveDetails(
      id: string
    ) : Observable<IDriveDetailsResponse> {
      const userDetailsUrl = `${environment.apiBase}/${environment.apiDrive}/${id}`;
      var headers = this.getStandardOptions();

      return this.http
        .get<IDriveDetailsResponse>(userDetailsUrl, headers)
        .pipe(
          tap((response) => {
            console.log(response);
            return response;
          })
        );
    }
}