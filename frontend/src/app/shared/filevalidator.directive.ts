import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

@Directive({
  selector: '[appFilevalidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: FilevalidatorDirective, multi: true }
  ]
})
export class FilevalidatorDirective implements Validator {
  static validate(c: FormControl): { [key: string]: any } {
    return c.value == null || c.value.length == 0 ? { "required": true } : null;
  }

  validate(c: FormControl): { [key: string]: any } {
    return FilevalidatorDirective.validate(c);
  }
}
