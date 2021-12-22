import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [ProfileComponent, LogoutComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
