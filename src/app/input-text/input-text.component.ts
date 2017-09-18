import { Subscription } from 'rxjs/Rx';
import { Component, forwardRef, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputTextComponent),
  multi: true
};

@Component({
  selector: 'tcf-input-text',
  template: `
    <label [for]="inputName">{{label}}<span *ngIf="maxlength > 0" class="input-add-info"> (max {{maxlength}} znaków)</span>:</label>
    <div class="controls">
      <input type="text" [name]="inputName" [id]="inputName" 
          [(ngModel)]="value" (blur)="onBlur()"/>
    </div>
    <div *ngIf="maxlength > 0" class="input-add-info">(max {{maxlength}} znaków)</div>
    <div class="feedback" *ngIf="externalControl.touched && externalControl.control.errors && externalControl.control.errors.required">Wypełnienie pola jest wymagane.</div>
    <div class="feedback" *ngIf="externalControl.touched && externalControl.control.errors && externalControl.control.errors.maxlength">Pole może mieć maksymalnie {{maxlength}} znaków.</div>
  `,
  styles: [],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  host: {
    '[class.form-group]': 'true'
  }
})
export class InputTextComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() label;
  @Input('name') inputName;
  @Input() maxlength;

  externalControl: NgControl;
  validationStatusSubscription: Subscription;

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.externalControl = this.injector.get(NgControl);
    if (this.externalControl != null) {
      this.validationStatusSubscription = this.externalControl.statusChanges.subscribe((validationStatus) => {
        if (validationStatus === 'VALID') {
          this.onTouchedCallback();
        }
      });
    }
  }
  ngOnDestroy() {
    this.validationStatusSubscription.unsubscribe();
  }

  //The internal data model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
      return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
      if (v !== this.innerValue) {
          this.innerValue = v;
          this.onChangeCallback(v);
      }
  }

  //Set touched on blur
  onBlur() {
      this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
      if (value !== this.innerValue) {
          this.innerValue = value;
      }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
      this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
  }

}
