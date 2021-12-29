import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SharedComponentsModule } from '../shared-components.module'
import { UserResolve } from '../user/user.resolve'
import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { ManagerMaterialModule } from './manager-material.module'
import { ManagerRoutingModule } from './manager-routing.module'
import { ManagerComponent } from './manager.component'
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component'
import { UserManagementComponent } from './user-management/user-management.component'
import { UserTableComponent } from './user-table/user-table.component'

@NgModule({
  declarations: [
    ManagerHomeComponent,
    ManagerComponent,
    UserManagementComponent,
    ReceiptLookupComponent,
    UserTableComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ManagerMaterialModule,
    FlexLayoutModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [UserResolve],
})
export class ManagerModule {}
