import { Injectable } from "@angular/core";
import { UserProfileResponse } from "../../models/user/userProfileResponse";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/env.const";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "../authentication/authentication.service";


@Injectable({
    providedIn: 'root',
})
export class UserService {
    
    constructor(
        private http: HttpClient,
        private authService: AuthenticationService
    ) {}

    private getStandardOptions() : any {
        return {
          headers: new HttpHeaders({            
            'Authorization': `Bearer ${this.authService._accessToken}`
          })
        };
      }   

    public getUserProfile(        
    ): Observable<UserProfileResponse> {
        const userProfileUrl = `${environment.apiUrl}/user/profile`;
        var headers = this.getStandardOptions();
        return this.http
         .get(userProfileUrl, headers)
         .pipe(
            map((response) => {
                console.log(response);
              return response as unknown as UserProfileResponse; // sta je ovo???
            })
          );
    }
}