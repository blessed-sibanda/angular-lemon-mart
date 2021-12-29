import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AppMaterialModule } from './app-material.module'
import { ViewUserComponent } from './user/view-user/view-user.component'
import { FieldErrorModule } from './user-controls/field-error/field-error.module'

@NgModule({
  declarations: [ViewUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppMaterialModule,
    FieldErrorModule,
  ],
  exports: [ViewUserComponent],
})
export class SharedComponentsModule {}
