import { Injectable } from "@angular/core";
import { IUserProfileResponse } from "../../models/user/userProfileResponse";
import { map, Observable, tap } from "rxjs";
import { environment } from "../../../environments/env.const";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "../authentication/authentication.service";
import { response } from "express";
import { IUpdateUserProfileRequest } from "../../models/user/updateUserProfileRequest";
import { IChangePasswordRequest } from "../../models/user/changePasswordRequest";


@Injectable({
    providedIn: 'root',
})
export class UserService {
    
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

    public getLoggedInUser(        
    ): Observable<IUserProfileResponse> {
        const userProfileUrl = `${environment.apiUrl}/user/profile`;        
        var headers = this.getStandardOptions();        
        
        return this.http
         .get<IUserProfileResponse>(userProfileUrl, headers)
         .pipe(
            tap((response) => {
              console.log(response);
              return response; 
            })
          );
    }

    public updateUserProfile(
      body: IUpdateUserProfileRequest           
    ): Observable<any> {
      var userId = this.authService._userId;      
      const updateProfileUrl = `${environment.apiUrl}/user/${userId}`;
      var headers = this.getStandardOptions();      

      return this.http
        .put(updateProfileUrl, body, headers)
        .pipe(
          tap((response) => {
            console.log(response);
            return response;
          })
        );
    };

    public changePassword(
      body: IChangePasswordRequest      
    ): Observable<any> {
      var userId = this.authService._userId;      
      const changePasswordUrl = `${environment.apiUrl}/user/${userId}/password`;
      var headers = this.getStandardOptions(); 

      return this.http
        .put(changePasswordUrl, body, headers)
        .pipe(
          tap((response) => {
            console.log(response);
            return response;
          })
        );
    }
}