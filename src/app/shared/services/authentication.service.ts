import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RegistrationResponse } from '../models/registerUser';
import { environment } from '../../../app/environments/env.const';
import { map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}  

  private url : string = 'https://localhost:7004/api/Authentication';

  private getStandardOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-type': 'application/json', // ovde dodati jwt token za ostale request-e
        'Response-Type': 'text',
      }),
    };
  }

  public registerUser(
    data : RegistrationResponse
  ): Observable<RegistrationResponse> {
    const registerUrl = `${environment.apiBaseUrl}/register`;
    debugger
    return this.http
      .post(registerUrl, {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        password: data.password,
        repeatPassword: data.repeatPassword,
        roleName: data.roleName,
      })
      .pipe(
        map((response) => {
          return response as RegistrationResponse;
        })
      );    
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('There is an issue with the client or network:', error.error);
    } else {
      console.log('Server side error: ', error.error);
    }

    console.log(error.message);
    return throwError(
      () => new Error('Could not register on the server. Please try again.'));  
  }
}
