import { NgModule } from '@angular/core';
import { MatIconModule, MatProgressBarModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatButtonModule } from '@angular/material';
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
    MatButtonModule,
    MatTooltipModule,
    NgbModule.forRoot(),
  ],
  exports: [
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    MatButtonModule,
    NgbModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ]
})
export class AppMaterialModule { }
