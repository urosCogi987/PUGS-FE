import { Injectable } from "@angular/core";
import { IUserProfileResponse } from "../../models/user/userProfileResponse";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/env.const";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "../authentication/authentication.service";
import { IUpdateUserProfileRequest } from "../../models/user/updateUserProfileRequest";
import { IChangePasswordRequest } from "../../models/user/changePasswordRequest";
import { IProfilePictureResponse } from "../../models/user/profilePictureResponse";
import { IUserListItemResponse } from "../../models/user/userListItemResponse";
import { IUserDetailsResponse } from "../../models/user/userDetailsResponse";

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
        const userProfileUrl = `${environment.apiBase}/${environment.apiUser}/current`;        
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

    public getBase64Image(     
      id: string | null 
    ): Observable<IProfilePictureResponse> {
      let userProfilePictureUrl = `${environment.apiBase}/${environment.apiUser}/image`; 
      if (id)
      {
        userProfilePictureUrl = `${environment.apiBase}/${environment.apiUser}/image/${id}`
      }
            
      var headers = this.getStandardOptions();   

      return this.http
        .get<IProfilePictureResponse>(userProfilePictureUrl, headers)
        .pipe(
          tap((response) => {
            console.log(response);
            return response;
          })
        )
    }

    public uploadImage(
      formData: any      
    ): Observable<any> {
      const uploadImageUrl = `${environment.apiBase}/${environment.apiUser}/image`;
      var headers = this.getStandardOptions();  

      return this.http
        .post(uploadImageUrl, formData, headers)
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
      const updateProfileUrl = `${environment.apiBase}/${environment.apiUser}/user`;
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
      const changePasswordUrl = `${environment.apiBase}/${environment.apiUser}/password`;
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

    public userList(      
    ) : Observable<IUserListItemResponse[]> {
      const userListUrl = `${environment.apiBase}/${environment.apiUser}`;
      var headers = this.getStandardOptions();

      return this.http
        .get<IUserListItemResponse[]>(userListUrl, headers)
        .pipe(
          tap((response) => {
            console.log(response);
            return response;
          })
        );
    }

    public userDetails(
      id: string
    ) : Observable<IUserDetailsResponse> {
      const userDetailsUrl = `${environment.apiBase}/${environment.apiUser}/${id}`;
      var headers = this.getStandardOptions();

      return this.http
        .get<IUserDetailsResponse>(userDetailsUrl, headers)
        .pipe(
          tap((response) => {
            console.log(response);
            return response;
          })
        );
    }
}