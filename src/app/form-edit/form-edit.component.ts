import { DictionariesService } from '../services/dictionaries.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';

import { Form } from '../model/form';

@Component({
  selector: 'tcf-form-edit',
  templateUrl: './form-edit.component.html',
  styles: []
})
export class FormEditComponent implements OnInit, AfterViewChecked {

  form = new Form();

  @ViewChild('f') htmlForm: NgForm;

  sAreas: Array<{name: string, sub: Array<string>}>;
  sIndex: Array<string>;
  sOwners: Array<string>;
  sTypes: Array<string>;

  constructor(private dictService: DictionariesService) { }

  ngOnInit() {
    this.dictService.getDictionaries().subscribe(
      (data) => {
        this.sAreas = (<any>data).sAreas;
        this.sIndex = (<any>data).sIndex;
        this.sOwners = (<any>data).sOwners;
        this.sTypes = (<any>data).sTypes;

        console.log(this);
      }
    );
  }

  ngAfterViewChecked() {
    console.log('Change detection trigerred');
  }

  test() {
    console.log('aaaaa');
    this.form = new Form();
    this.htmlForm.form.get('area').setValue('0');
  }

  reset() {
    this.htmlForm.reset();
  }
}
