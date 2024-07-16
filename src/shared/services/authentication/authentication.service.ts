import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RegisterUser } from '../../models/registerUser';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private url : string = 'https://localhost:7004/api/Authentication';

  private getStandardOptions() : any {
    return {
      headers: new HttpHeaders({
        'Content-type': 'application/json', // ovde dodati jwt token za ostale request-e 
        'Response-Type': 'text' 
      })
    };
  }    

  registerUser(registerUser : RegisterUser) {
    let options = this.getStandardOptions();
    let body = JSON.stringify(registerUser);

    return this.http.post(`${this.url}/register`, body, options).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('There is an issue with the client or network:', error.error);
    } else {
      console.log('Server side error: ', error.error);
    }

    console.log(error.message);
    return throwError(() => new Error('Could not register on the server. Please try again.'));  
  }
}
