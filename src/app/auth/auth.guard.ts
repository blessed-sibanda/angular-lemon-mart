import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router'
import { Observable, map, take } from 'rxjs'

import { UiService } from '../common/ui.service'
import { Role } from './auth.enum'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    protected authService: AuthService,
    private uiService: UiService,
    protected router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(route)
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(childRoute)
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin()
  }

  protected checkLogin(route?: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.authStatus$.pipe(
      map((authStatus) => {
        const roleMatch = this.checkRoleMatch(authStatus.userRole, route)
        const allowLogin = authStatus.isAuthenticated && roleMatch
        if (!allowLogin) {
          this.showAlert(authStatus.isAuthenticated, roleMatch)
          this.router.navigate(['login'], {
            queryParams: {
              redirectUrl: this.getResolvedUrl(route),
            },
          })
        }
        return allowLogin
      }),
      take(1)
    )
  }

  private checkRoleMatch(role: Role, route?: ActivatedRouteSnapshot) {
    if (!route?.data?.['expectedRole']) {
      return true
    }
    return role === route.data['expectedRole']
  }

  private showAlert(isAuth: boolean, roleMatch: boolean) {
    if (!isAuth) {
      this.uiService.showToast('You must login to continue')
    }
    if (!roleMatch) {
      this.uiService.showToast('You do not have the permissions to view this resource')
    }
  }

  getResolvedUrl(route?: ActivatedRouteSnapshot): string {
    if (!route) return ''
    return route.pathFromRoot
      .map((r) => r.url.map((segment) => segment.toString()).join('/'))
      .join('/')
      .replace('//', '/')
  }
}
