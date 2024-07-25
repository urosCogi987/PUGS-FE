import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize, map, Observable, share, tap } from 'rxjs';
import { TokenNames } from '../../../const/token.const'; 
import { environment } from '../../../environments/env.const'; 
import { LoginResponse } from '../../models/loginUser';
import { RegistrationResponse } from '../../models/registerUser'; 
import { TokenResponse } from '../../models/tokenResponse';
import { ApplicationRoutes } from '../../../const/application-routes';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  protected appRoutes = ApplicationRoutes;
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private _token$: Observable<void> | null = null;
  private readonly tokenNames = TokenNames;
  private accessToken?: string | null;
  private refreshToken?: string | null;
  private userId?: string | null;

  protected loggedUser?: string | null;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.loadTokenData();
  }

  public get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public get getRefreshToken$(): Observable<void> {
    if (!this._token$) {
      this._token$ = this.refreshAccessToken().pipe(
        share(),
        finalize(() => {
          this._token$ = null;
        }),
        map((response) => {
          this.accessToken = response.accessToken;
        })
      );
    }

    return this._token$;
  }

  public get _authToken(): string {
    return this.refreshToken || '';
  }

  public get _accessToken(): string {
    return this.accessToken || '';
  }

  public get _userId(): string {
    return this.userId || '';
  }

  public removeTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    this.userId = null;
    localStorage.removeItem(this.tokenNames.ACCESS_TOKEN);
    localStorage.removeItem(this.tokenNames.REFRESH_TOKEN);
    localStorage.removeItem(this.tokenNames.USER_ID);
  }

  public hasToken(): boolean {
    return !!this._accessToken;
  }

  private updateLoggedInStatus(): void {
    this.loggedIn.next(this.hasToken());
  }

  public registerUser(
    data: RegistrationResponse
  ): Observable<RegistrationResponse> {
    const registerUrl = `${environment.apiBaseUrl}/register`;
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

  public loginUser(data: LoginResponse): Observable<boolean> {
    const loginURL = `${environment.apiBaseUrl}/login`;
    return this.http.post<any>(loginURL, data).pipe(
      tap((tokens) => {
        this.loggedIn.next(true);
        this.doLoginUser(tokens);
      })
    );
  }

  public refreshAccessToken(): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${environment.apiBaseUrl}/refresh`, {
        refreshToken: this._authToken,
      })
      .pipe(
        tap((response) => {
          this.storeTokens(response);
        })
      );
  }

  public logoutUser(): void {
    this.doLogoutUser();
  }

  // getUserId(): Observable<number>{
  //   var userId = this.tokenNames.ACCESS_TOKEN;
  //   return localStorage.getItem(this.tokenNames.ACCESS_TOKEN).pipe(
  //     switchMap((jwt: string) => of(this.jwtHelper.decodeToken(jwt)).pipe(
  //       map((jwt: any) => jwt.user.id)
  //     )
  //   ));
  // }

  private doLogoutUser() {
    this.loggedIn.next(false);
    this.removeTokens();
    this.router.navigate([`${this.appRoutes.Login}`]);
  }
  
  private loadTokenData(): void {
    const window = this.document.defaultView;
    if (window && window.localStorage) {
      this.accessToken = localStorage.getItem(this.tokenNames.ACCESS_TOKEN);
      this.refreshToken = localStorage.getItem(this.tokenNames.REFRESH_TOKEN);
      this.userId = localStorage.getItem(this.tokenNames.USER_ID);
      this.updateLoggedInStatus();
    }
  }

  private doLoginUser(tokens?: any) {
    this.storeTokens(tokens);
  }  

  private storeTokens(tokens: any) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
    this.userId = tokens.userId;
    localStorage.setItem(this.tokenNames.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(this.tokenNames.REFRESH_TOKEN, tokens.refreshToken);
    localStorage.setItem(this.tokenNames.USER_ID, tokens.userId);
  }  
}
