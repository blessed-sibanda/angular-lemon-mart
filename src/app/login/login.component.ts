import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, combineLatest, filter, tap } from 'rxjs';
import { SubSink } from 'subsink';
import { Role } from '../auth/auth.enum';
import { AuthService } from '../auth/auth.service';
import { UiService } from '../common/ui.service';
import { EmailValidation, PasswordValidation } from '../common/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  loginForm = new FormGroup({});
  loginError = '';
  redirectUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {
    this.subs.sink = route.queryParamMap.subscribe(
      (params) => (this.redirectUrl = params.get('redirectUrl') ?? '')
    );
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.authService.logout();
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    });
  }

  async login(submittedForm: FormGroup) {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .pipe(
        catchError((err) => {
          return (this.loginError = err.message);
        })
      )
      .subscribe();

    this.subs.sink = combineLatest([
      this.authService.authStatus$,
      this.authService.currentUser$,
    ])
      .pipe(
        filter(
          ([authStatus, user]) => authStatus.isAuthenticated && user._id !== ''
        ),
        tap(([authStatus, user]) => {
          console.log('User -->', user);
          this.uiService.showToast(
            `Welcome ${user.fullName}! Role: ${user.role}`
          );
          this.router.navigate([
            this.redirectUrl || this.homeRoutePerRole(user.role as Role),
          ]);
        })
      )
      .subscribe();
  }

  private homeRoutePerRole(role: Role) {
    switch (role) {
      case Role.Cashier:
        return '/pos';
      case Role.Clerk:
        return '/inventory';
      case Role.Manager:
        return '/manager';
      default:
        return '/user/profile';
    }
  }
}
