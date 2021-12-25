import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { $enum } from 'ts-enum-util';
import { transformError } from '../common/common';
import { IUser, User } from '../user/user';
import { Role } from './auth.enum';
import { AuthService, IAuthStatus, IServerAuthResponse } from './auth.service';

interface IJwtToken {
  email: string;
  role: string;
  picture: string;
  iat: string;
  exp: string;
  sub: string;
}

@Injectable()
export class CustomAuthService extends AuthService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    return this.httpClient.post<IServerAuthResponse>(
      `${environment.baseUrl}/v1/auth/login`,
      { email, password }
    );
  }

  protected transformJwtToken(token: IJwtToken): IAuthStatus {
    return {
      isAuthenticated: token.email ? true : false,
      userId: token.sub,
      userRole: $enum(Role).asValueOrDefault(token.role, Role.None),
      userEmail: token.email,
      userPicture: token.picture,
    };
  }

  protected getCurrentUser(): Observable<User> {
    return this.httpClient
      .get<IUser>(`${environment.baseUrl}/v1/auth/me`)
      .pipe(map(User.Build));
  }
}
