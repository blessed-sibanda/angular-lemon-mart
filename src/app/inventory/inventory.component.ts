import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  template: `
    <mat-toolbar color="accent" fxLayoutGap="8px">
      <a mat-button routerLinkActive="active-link" routerLink="/inventory/home">
        Inventory Dashboard
      </a>
      <a
        mat-button
        routerLinkActive="active-link"
        routerLink="/inventory/stock"
      >
        Stock Entry
      </a>
      <a
        mat-button
        routerLinkActive="active-link"
        routerLink="/inventory/products"
      >
        Products
      </a>

      <a
        mat-button
        routerLinkActive="active-link"
        routerLink="/inventory/categories"
      >
        Categories
      </a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
