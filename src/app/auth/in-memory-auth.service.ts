import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { sign } from 'fake-jwt-sign';
import { PhoneType, User } from '../user/user';
import { AuthService, IAuthStatus, IServerResponse } from './auth.service';
import { Role } from './auth.enum';

@Injectable()
export class InMemoryAuthService extends AuthService {
  private defaultUser = User.Build({
    id: 1,
    email: 'blessed@test.com',
    name: { first: 'Blessed', last: 'Sibanda' },
    role: Role.Manager,
    picture:
      'https://secure.gravatar.com/avatar/14baf1f4155b9dca35b7bbd97bcc3da7',
    dateOfBirth: new Date(1996, 7, 15),
    userStatus: true,
    address: {
      line1: '123 Main Street',
      city: 'Gweru',
      state: 'Midlands',
      zip: '00123',
    },
    level: 0,
    phones: [
      {
        id: 0,
        type: PhoneType.Mobile,
        digits: '7777888999',
      },
    ],
    fullName: '',
  });
  constructor() {
    super();
    console.warn(
      "You're using the InMemoryAuthService. Do not use this service in production"
    );
  }

  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerResponse> {
    email = email.toLowerCase();
    if (!email.endsWith('@test.com')) {
      return throwError(
        () => new Error('Failed to login! Email needs to end with @test.com.')
      );
    }
    const authStatus: IAuthStatus = {
      isAuthenticated: true,
      userId: this.defaultUser.id,
      userRole: email.includes('cashier')
        ? Role.Cashier
        : email.includes('clerk')
        ? Role.Clerk
        : email.includes('manager')
        ? Role.Manager
        : Role.None,
    };
    this.defaultUser.role = authStatus.userRole;

    const authResponse: IServerResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    };

    return of(authResponse);
  }
  protected transformJwtToken(token: unknown): IAuthStatus {
    throw new Error('Method not implemented.');
  }
  protected getCurrentUser(): Observable<User> {
    return of(this.defaultUser);
  }
}
