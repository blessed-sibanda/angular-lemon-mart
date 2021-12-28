import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { SubSink } from 'subsink'

import { Role } from '../auth/auth.enum'
import { AuthService } from '../auth/auth.service'
import { UiService } from '../common/ui.service'
import { EmailValidation, PasswordValidation } from '../common/validators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs = new SubSink()
  loginForm!: FormGroup
  loginError = ''
  redirectUrl: string | null | undefined

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {
    this.subs.sink = route.queryParamMap.subscribe(
      (params) => (this.redirectUrl = params.get('redirectUrl'))
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.authService.logout()
    this.buildLoginForm()
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    })
  }

  login(submittedForm: FormGroup) {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .subscribe({
        error: (err) => (this.loginError = err.message),
        next: () => {
          let authStatus = this.authService.authStatus$.getValue()
          let user = this.authService.currentUser$.getValue()
          if (authStatus.isAuthenticated && user?._id !== '') {
            this.uiService.showToast(`Welcome ${user.fullName}! Role: ${user.role}`)
            this.router.navigate([
              this.redirectUrl || this.homeRoutePerRole(user.role as Role),
            ])
          }
        },
      })
  }

  private homeRoutePerRole(role: Role) {
    switch (role) {
      case Role.Cashier:
        return '/pos'
      case Role.Clerk:
        return '/inventory'
      case Role.Manager:
        return '/manager'
      default:
        return '/user/profile'
    }
  }
}
