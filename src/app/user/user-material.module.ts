import { NgModule } from '@angular/core'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDividerModule } from '@angular/material/divider'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatStepperModule } from '@angular/material/stepper'
import { MatLineModule, MatNativeDateModule } from '@angular/material/core'

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    MatAutocompleteModule,
    MatDatepickerModule,
    MatDividerModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatLineModule,
    MatNativeDateModule,
  ],
})
export class UserMaterialModule {}
