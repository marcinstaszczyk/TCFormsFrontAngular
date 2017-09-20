import { Directive, OnChanges, SimpleChanges, forwardRef, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidatorFn, AbstractControl, ValidationErrors, Validators } from '@angular/forms';

//import { CustomValidators } from 'ng2-validation';
import { minDate } from 'ng2-validation/dist/min-date';
import { maxDate } from 'ng2-validation/dist/max-date';

/**
 * MS:
 * Code below is based on buildin Angular directives.
 * Use validator from ng2-validation just registers it to 'min' and 'max' attributes (not 'dateMin', 'dateMax').
 */

/**
 * Provider which adds {@link MaxDateValidator} to {@link NG_VALIDATORS}.
 */
export const MAX_DATE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxDateValidator),
  multi: true
};

/**
 * A directive which installs the {@link MaxDateValidator}.
 */
@Directive({
  selector: '[max][formControlName][type=date],[max][formControl][type=date],[max][ngModel][type=date]',
  providers: [MAX_DATE_VALIDATOR],
  host: {'[attr.max]': 'maxDate ? maxDate : null'}
})
export class MaxDateValidator implements Validator, OnChanges {
  private _validator: ValidatorFn;
  private _onChange: () => void;

  @Input('max') maxDate: string | Date;

  ngOnChanges(changes: SimpleChanges): void {
    if ('maxDate' in changes) {
      this._createValidator();
      if (this._onChange) this._onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors|null {
    return this.maxDate != null ? this._validator(c) : null;
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
    this._validator = maxDate(this.maxDate);
  }

  
}


/**
 * Provider which adds {@link MinDateValidator} to {@link NG_VALIDATORS}.
 */
export const MIN_DATE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinDateValidator),
  multi: true
};

/**
 * A directive which installs the {@link MinDateValidator}.
 */
@Directive({
  selector: '[min][formControlName][type=date],[min][formControl][type=date],[min][ngModel][type=date]',
  providers: [MIN_DATE_VALIDATOR],
  host: {'[attr.min]': 'minDate ? minDate : null'}
})
export class MinDateValidator implements Validator, OnChanges {
  private _validator: ValidatorFn;
  private _onChange: () => void;

  @Input('min') minDate: string | Date;

  ngOnChanges(changes: SimpleChanges): void {
    if ('minDate' in changes) {
      this._createValidator();
      if (this._onChange) this._onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors|null {
    return this.minDate != null ? this._validator(c) : null;
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
    this._validator = minDate(this.minDate);
  }

  
}