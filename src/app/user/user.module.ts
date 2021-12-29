import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { NgxMaskModule } from 'ngx-mask'

import { AppMaterialModule } from '../app-material.module'
import { FieldErrorModule } from '../user-controls/field-error/field-error.module'
import { LemonRaterComponent } from '../user-controls/lemon-rater/lemon-rater.component'
import { LogoutComponent } from './logout/logout.component'
import { ProfileComponent } from './profile/profile.component'
import { UserMaterialModule } from './user-material.module'
import { UserRoutingModule } from './user-routing.module'
import { ViewUserComponent } from './view-user/view-user.component'

@NgModule({
  declarations: [
    ProfileComponent,
    LogoutComponent,
    ViewUserComponent,
    LemonRaterComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AppMaterialModule,
    UserMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FieldErrorModule,
    NgxMaskModule.forChild(),
  ],
})
export class UserModule {}
