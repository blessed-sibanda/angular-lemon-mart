import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button><mat-icon>menu</mat-icon></button>
      <a mat-button routerLink="/home"><h1>LemonMart</h1></a>
      <span class="flex-spacer"></span>
      <button
        routerLink="/user/profile"
        mat-icon-button
        aria-label="User Profile"
      >
        <mat-icon>account_circle</mat-icon>
      </button>
      <button routerLink="/user/logout" aria-label="Logout" mat-icon-button>
        <mat-icon>lock_open</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
