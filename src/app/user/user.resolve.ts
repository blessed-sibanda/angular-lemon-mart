import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { catchError, map, Observable } from 'rxjs'
import { IUser, User } from './user'
import { UserService } from './user.service'
import { transformError } from '../common/common'

@Injectable()
export class UserResolve implements Resolve<IUser> {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IUser | Observable<IUser> | Promise<IUser> {
    return this.userService
      .getUser(route.paramMap.get('userId'))
      .pipe(map(User.Build), catchError(transformError))
  }
}
