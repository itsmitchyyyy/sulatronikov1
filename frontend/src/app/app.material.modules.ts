import { NgModule } from '@angular/core';
import { MatIconModule, MatProgressBarModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTooltipModule,
    NgbModule.forRoot(),
  ],
  exports: [
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    NgbModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ]
})
export class AppMaterialModule { }
