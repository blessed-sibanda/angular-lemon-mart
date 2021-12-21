import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {
  BehaviorSubject,
  map,
  tap,
  Observable,
  filter,
  catchError,
  throwError,
  mergeMap,
} from 'rxjs';
import { transformError } from '../common/common';
import { IUser, User } from '../user/user';
import { Role } from './auth.enum';
import { CacheService } from './cache.service';

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  userId: number;
}

export interface IServerResponse {
  accessToken: string;
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: 0,
};

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>;
  readonly currentUser$: BehaviorSubject<IUser>;
  login(email: string, password: string): Observable<void>;
  logout(clearToken?: boolean): void;
  getToken(): string;
}

@Injectable()
export abstract class AuthService extends CacheService implements IAuthService {
  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);
  readonly currentUser$ = new BehaviorSubject<IUser>(new User());

  constructor() {
    super();
  }

  login(email: string, password: string): Observable<void> {
    this.clearToken();

    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken);
        const token = jwt_decode(value.accessToken);
        return this.transformJwtToken(token);
      }),
      tap((status) => this.authStatus$.next(status)),
      filter((status: IAuthStatus) => status.isAuthenticated),
      mergeMap(() => this.getCurrentUser()),
      map((user) => this.currentUser$.next(user)),
      catchError(transformError)
    );
    loginResponse$.subscribe({
      error: (err) => {
        this.logout();
        return throwError(() => err);
      },
    });
    return loginResponse$;
  }

  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken();
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0);
  }

  getToken(): string {
    return this.getItem('jwt') ?? '';
  }

  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerResponse>;

  protected abstract transformJwtToken(token: unknown): IAuthStatus;
  protected abstract getCurrentUser(): Observable<User>;

  protected setToken(jwt: string) {
    this.setItem('jwt', jwt);
  }

  protected clearToken() {
    this.removeItem('jwt');
  }
}
