import { NgModule } from '@angular/core';
import { MatIconModule, MatProgressBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressBarModule
  ],
  exports: [
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule
  ]
})
export class AppMaterialModule { }
