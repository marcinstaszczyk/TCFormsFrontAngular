import { Directive, OnChanges, SimpleChanges, forwardRef, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidatorFn, AbstractControl, ValidationErrors, Validators } from '@angular/forms';

/**
 * MS:
 * Code below is based on buildin Angular directives.
 */

/**
 * Provider which adds {@link MaxNumberValidator} to {@link NG_VALIDATORS}.
 */
export const MAX_NUMBER_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxNumberValidator),
  multi: true
};

/**
 * A directive which installs the {@link MaxNumberValidator}.
 */
@Directive({
  selector: '[max][formControlName]:not([type=date]),[max][formControl]:not([type=date]),[max][ngModel]:not([type=date])',
  providers: [MAX_NUMBER_VALIDATOR],
})
export class MaxNumberValidator implements Validator, OnChanges {
  private _validator: ValidatorFn;
  private _onChange: () => void;

  @Input('max') maxNumber: string;

  ngOnChanges(changes: SimpleChanges): void {
    if ('maxNumber' in changes) {
      this._createValidator();
      if (this._onChange) this._onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors|null {
    return this.maxNumber != null ? this._validator(c) : null;
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
    this._validator = Validators.max(parseInt(this.maxNumber, 10));
  }
}


/**
 * Provider which adds {@link MinNumberValidator} to {@link NG_VALIDATORS}.
 */
export const MIN_NUMBER_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinNumberValidator),
  multi: true
};

/**
 * A directive which installs the {@link MinNumberValidator}.
 */
@Directive({
  selector: '[min][formControlName]:not([type=date]),[min][formControl]:not([type=date]),[min][ngModel]:not([type=date])',
  providers: [MIN_NUMBER_VALIDATOR],
})
export class MinNumberValidator implements Validator, OnChanges {
  private _validator: ValidatorFn;
  private _onChange: () => void;

  @Input('min') minNumber: string;

  ngOnChanges(changes: SimpleChanges): void {
    if ('minNumber' in changes) {
      this._createValidator();
      if (this._onChange) this._onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors|null {
    return this.minNumber != null ? this._validator(c) : null;
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
    this._validator = Validators.min(parseInt(this.minNumber, 0));
  }
}