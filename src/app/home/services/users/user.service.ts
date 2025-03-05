import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoggedInUser, User, UserLogin, UserToken} from '../../../../types/user.type';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private loggedInUserInfo: BehaviorSubject<LoggedInUser> = new BehaviorSubject(<LoggedInUser>{});
  private authToken: string;
  constructor(private httpClient: HttpClient) {
    this.loadToken();
  }
  get isUserAuthenticated(): boolean {
      return this.isAuthenticated.value;
  }
  get isUserAuthenticated$(): Observable<boolean> {
      return this.isAuthenticated.asObservable();
  }
  get loggedInUser$(): Observable<LoggedInUser> {
      return this.loggedInUserInfo.asObservable();
  }
  get loggedInUser(): LoggedInUser {
    return this.loggedInUserInfo.value;
  }
  get token() {
    return this.authToken;
  }
  createUser(user: User): Observable<any> {
    const url = "http://localhost:5011/users/signup";
    return this.httpClient.post<User>(url, user);
  }

  login(userLogin: UserLogin): Observable<any> {
    const url = "http://localhost:5011/users/login";
    console.log(userLogin);
    return this.httpClient.post<User>(url, userLogin);
  }

  activateToken(token: UserToken) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('expiry', new Date(Date.now() + token.expiresInSeconds * 1000).toISOString());

    localStorage.setItem('firstName', token.user.firstName);
    localStorage.setItem('lastName', token.user.lastName);
    localStorage.setItem('email', token.user.email);
    localStorage.setItem('address', token.user.address);
    localStorage.setItem('city', token.user.city);
    localStorage.setItem('state', token.user.state);
    localStorage.setItem('pin', token.user.pin);

    this.isAuthenticated.next(true);
    this.loggedInUserInfo.next(token.user);
    this.authToken = token.token;
  }
  loadToken() {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expiry');
    if (!token || !expiry) {
      return;
    } else {
      const expiresIn = new Date(expiry).getTime() - new Date().getTime();
      if (expiresIn > 0) {
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
        const email = localStorage.getItem('email');
        const address = localStorage.getItem('address');
        const city = localStorage.getItem('city');
        const state = localStorage.getItem('state');
        const pin = localStorage.getItem('pin');

        const user: LoggedInUser = {
          firstName: firstName !== null ? firstName : '',
          lastName: lastName !== null ? lastName : '',
          email: email !== null ? email : '',
          city: city !== null ? city : '',
          state: state !== null ? state : '',
          address: address !== null ? address : '',
          pin: pin !== null ? pin : '',
        };
        this.isAuthenticated.next(true);
        this.loggedInUserInfo.next(user);
        this.authToken = token;
      } else {
        this.logout();
      }
    }
  }
  logout(): void {
    localStorage.clear();
    this.isAuthenticated.next(false);
    this.loggedInUserInfo.next(<LoggedInUser>{});
  }
}
