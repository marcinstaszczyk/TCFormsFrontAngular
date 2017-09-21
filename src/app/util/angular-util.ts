import { AbstractControl } from '@angular/forms';

export function markAsTouchedDeep(control: AbstractControl): void {
  // Mark this control as dirty.
  control.markAsTouched();
  
  let ctrl = <any>control;
  // Recursively mark any children as dirty.
  if (control.hasOwnProperty('controls')) {
    for (let inner in ctrl.controls) {
      markAsTouchedDeep(ctrl.controls[inner] as AbstractControl);
    }
  }
}