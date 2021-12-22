import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div
      fxLayout="row"
      fxLayoutAlign="center"
      class="margin-top"
      *ngIf="(authService.authStatus$ | async)?.isAuthenticated; else doLogin"
    >
      <div class="mat-typography" style="text-align: center;">
        <h1>This is LemonMart! The place where</h1>
        <h2>You get a lemon, you get a lemon, you get a lemon...</h2>
        <h3>Everybody gets a lemon.</h3>
      </div>
    </div>

    <ng-template #doLogin>
      <app-login></app-login>
    </ng-template>
  `,
})
export class HomeComponent {
  displayLogin = true;

  constructor(public authService: AuthService) {}
}
