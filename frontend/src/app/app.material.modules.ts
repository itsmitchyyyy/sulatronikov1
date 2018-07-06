import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AppMaterialModule { }
