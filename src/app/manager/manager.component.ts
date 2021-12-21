import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  template: `
    <mat-toolbar color="accent">
      <a mat-button routerLinkActive="active-link" routerLink="/manager/home">
        Manager's Dashboard
      </a>
      <a mat-button routerLinkActive="active-link" routerLink="/manager/users">
        User Management
      </a>
      <a
        mat-button
        routerLinkActive="active-link"
        routerLink="/manager/receipts"
      >
        Receipt Lookup
      </a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
