import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, filter, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-display-2">Hello, Limoncu!</span>
      <button (click)="login()" mat-raised-button color="primary">
        Login as Manager
      </button>
    </div>
  `,
  styles: [
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login('blessed.manager@test.com', '123456789');

    combineLatest([this.authService.authStatus$, this.authService.currentUser$])
      .pipe(
        filter(([authStatus, user]) => {
          return authStatus.isAuthenticated && user.id > 0;
        }),
        tap(([authStatus, user]) => {
          this.router.navigate(['/manager']);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
