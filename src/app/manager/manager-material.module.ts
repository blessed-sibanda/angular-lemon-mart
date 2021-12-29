import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AppMaterialModule } from '../app-material.module'

const modules = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  FormsModule,
  AppMaterialModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  MatProgressSpinnerModule,
]

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: modules,
})
export class ManagerMaterialModule {}
