import { Directive, OnChanges, SimpleChanges, forwardRef, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidatorFn, AbstractControl, ValidationErrors, Validators } from '@angular/forms';

/**
 * MS:
 * Code below is mostly copied from Angular sources.
 * Only slight modifications here.
 */

/**
 * Provider which adds {@link MaxLengthValidator} to {@link NG_VALIDATORS}.
 */
export const MAX_LENGTH_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxlengthDirective),
  multi: true
};

/**
 * A directive which installs the {@link MaxLengthValidator} 
 * which is not setting html `maxlength` attribute.
 */
@Directive({
  selector: '[tcf-maxlength]',
  providers: [MAX_LENGTH_VALIDATOR],
})
export class MaxlengthDirective implements Validator, OnChanges {
  private _validator: ValidatorFn;
  private _onChange: () => void;

  @Input('tcf-maxlength') maxlength: string;

  ngOnChanges(changes: SimpleChanges): void {
    if ('maxlength' in changes) {
      this._createValidator();
      if (this._onChange) this._onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors|null {
    return this.maxlength != null ? this._validator(c) : null;
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
    this._validator = Validators.maxLength(parseInt(this.maxlength, 10));
  }
}