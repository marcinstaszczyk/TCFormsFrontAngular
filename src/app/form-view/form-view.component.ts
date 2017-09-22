import { Form } from './../model/form';
import { Component, OnInit, Input, Sanitizer, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tcf-form-view',
  templateUrl: './form-view.component.html',
  styles: []
})
export class FormViewComponent implements OnInit {

  @Input() form;
  @Input() showDetails = true;
  @Output() formClick = new EventEmitter<Form>();

  constructor() { }

  ngOnInit() {}

  onViewClicked() {
    this.formClick.emit(this.form); 
  }

}
