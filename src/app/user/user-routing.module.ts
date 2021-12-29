import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from '../auth/auth.guard'
import { LogoutComponent } from './logout/logout.component'
import { ProfileComponent } from './profile/profile.component'
import { UserResolve } from './user.resolve'

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: { user: UserResolve },
  },
  { path: 'logout', component: LogoutComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
