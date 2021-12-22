import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar
      *ngIf="{
        status: authService.authStatus$ | async,
        user: authService.currentUser$ | async
      } as auth"
      color="primary"
      fxLayoutGap="8px"
    >
      <button mat-icon-button><mat-icon>menu</mat-icon></button>
      <a mat-button routerLink="/home"><h1>LemonMart</h1></a>
      <span class="flex-spacer"></span>
      <button
        *ngIf="auth?.status?.isAuthenticated"
        routerLink="/user/profile"
        class="mat-elevation-z2"
        mat-mini-fab
        color="primary"
        aria-label="User Profile"
      >
        <img
          *ngIf="auth?.user?.picture; else icon"
          [src]="auth?.user?.picture"
          class="image-cropper"
          alt=""
        />
        <ng-template #icon><mat-icon>account_circle</mat-icon></ng-template>
      </button>
      <button
        *ngIf="auth?.status?.isAuthenticated"
        routerLink="/user/logout"
        aria-label="Logout"
        class="mat-elevation-z2"
        mat-mini-fab
        color="primary"
      >
        <mat-icon>lock_open</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
