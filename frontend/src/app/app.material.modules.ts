import { NgModule } from '@angular/core';
import { MatIconModule, MatProgressBarModule, MatSnackBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressBarModule,
    NgbModule.forRoot(),
  ],
  exports: [
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    NgbModule
  ]
})
export class AppMaterialModule { }
