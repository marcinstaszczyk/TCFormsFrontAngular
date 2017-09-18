import { Subscription } from 'rxjs/Rx';
import { NgControl } from '@angular/forms';
import { Component, ContentChild, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'tcf-input-wrapper',
  template: `
    <label [for]="inputName">Nazwa formy<span *ngIf="addInfo" class="input-add-info"> {{addInfo}}</span>:</label>
    <div class="controls">
      <ng-content select="input"></ng-content>
      <ng-content select="select"></ng-content>
      <ng-content select="textarea"></ng-content>
    </div>
    <div *ngIf="addInfo" class="input-add-info">{{addInfo}}</div>
    <div class="feedback" *ngIf="externalControl && externalControl.touched && externalControl.control.errors && externalControl.control.errors.required">Wypełnienie pola jest wymagane.</div>
    <ng-content select=".feedback"></ng-content>
  `,
  styles: [],
  host: {
    '[class.form-group]': 'true',
    '[class.ng-untouched]': 'externalControl.untouched',
    '[class.ng-touched]': 'externalControl.touched',
    '[class.ng-valid]': 'externalControl.valid',
    '[class.ng-invalid]': 'externalControl.invalid',
  }
})
export class InputWrapperComponent implements OnInit, OnDestroy {

  @Input() label;
  @Input('for') inputName;
  @Input() addInfo;

  @ContentChild(NgControl) externalControl: NgControl;
  validationStatusSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.validationStatusSubscription = this.externalControl.statusChanges.subscribe((validationStatus) => {
      if (validationStatus === 'VALID') {
        this.externalControl.control.markAsTouched();
      }
    });
  }

  ngOnDestroy() {
    this.validationStatusSubscription.unsubscribe();
  }
}
