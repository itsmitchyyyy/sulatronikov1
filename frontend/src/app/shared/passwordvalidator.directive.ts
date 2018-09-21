import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup, Validator, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

function validatePassword(): ValidatorFn {
  return (control: AbstractControl) => {
    let isValid = false;
    if (control && control instanceof FormGroup) {
      let group = control as FormGroup;
      if (group.controls['newPasswords'] && group.controls['confirmPasswords']) {
        isValid = group.controls['newPasswords'].value == group.controls['confirmPasswords'];
      }
    }
    if (isValid) {
      return null;
    } else {
      return { 'passwordMatch': 'failed' }
    }
  }
}

@Directive({
  selector: '[appPasswordvalidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordvalidatorDirective, multi: true }]
})
export class PasswordvalidatorDirective implements Validator {
  private valFn;

  constructor() {
    this.valFn = validatePassword();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.valFn(c);
  }

}
