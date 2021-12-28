import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { Role } from '../auth/auth.enum'
import { AuthGuard } from '../auth/auth.guard'

import { PosComponent } from './pos.component'

const routes: Routes = [
  {
    path: '',
    component: PosComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: [Role.Cashier, Role.Manager] },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosRoutingModule {}
