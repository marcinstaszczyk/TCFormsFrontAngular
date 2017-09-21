import { FormsService } from '../services/forms.service';
import { Form } from './../model/form';
import { AbstractControl } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';

import { markAsTouchedDeep } from '../util/angular-util';

@Component({
  selector: 'tcf-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styles: []
})
export class MainDashboardComponent implements OnInit {

  form = new Form();

  constructor(private formsService: FormsService) { }

  ngOnInit() {
  }

  onLoadFormForUUID(form: NgForm, uuid: string) {
    if (form.invalid) {
      markAsTouchedDeep(form.control);
      return;
    } else {
      this.formsService.getForm(uuid).subscribe(
        (form) => {
          this.form = form;
        }
      );
    }
  }

  onNewForm() {
    this.form = new Form();
  }

  onSave() {
    this.formsService.saveForm(this.form).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      },
    )
  }
}

