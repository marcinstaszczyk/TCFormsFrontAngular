import { DictionariesService } from '../services/dictionaries.service';
import { FormControl, NgForm, Validators } from '@angular/forms';
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

  minStartDate: string;
  maxStartDate: string;

  sAreas: Array<{name: string, sub: Array<string>}>;
  sTypes: Array<string>;
  sOwners: Array<string>;
  sIndex: Array<string>;
  
  indexOptions = new Array<{option: string, checked: boolean}>();

  showIndex = false;

  constructor(private dictService: DictionariesService) { 
    this.minStartDate = FormEditComponent.dateToDateString(new Date());

    let date = new Date();
    date.setFullYear(date.getFullYear() + 1)

    this.maxStartDate = FormEditComponent.dateToDateString(date);
  }

  ngOnInit() {
    this.htmlForm.control.addControl('index', new FormControl(null, Validators.max(4)));

    this.dictService.getDictionaries().subscribe(
      (data) => {
        this.sAreas = (<any>data).sAreas;
        this.sTypes = (<any>data).sTypes;
        this.sOwners = (<any>data).sOwners;
        this.sIndex = (<any>data).sIndex;

        console.log(this);

        this._initForm();
      }
    );
  }

  private _initForm() {
    if (this.form && this.sIndex) {
      this.indexOptions = 
        this.sIndex.map(option => { 
          return { 
            option: option, 
            checked: this.form.index && this.form.index.some(value => value === option) ? true : null//Math.random() >= 0.5//
          }
        });
    }
  }

  onIndexCheckboxClick(option: {option: string, checked: boolean}) {
    option.checked = option.checked ? null : true;//with false it is not updating checkbox through [checked]="option.checked"
    
    this.form.index = this.indexOptions.filter(opt => opt.checked).map(opt => opt.option);
    this.htmlForm.control.get('index').setValue(this.form.index.length);
  }

  ngAfterViewChecked() {
    console.log('Change detection trigerred');
  }

  onToggleIndex() {
    this.showIndex = !this.showIndex;
  }

  test() {
    //this.form = new Form();
    //this.htmlForm.form.get('area').setValue('0');

    console.log('zxczxc', this.indexOptions.filter(opt => opt.checked).reduce<number>(((count) => count+1), 0));
  }

  reset() {
    this.htmlForm.reset();
  }

  static dateToDateString(today: Date) {
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!    
    var yyyy = today.getFullYear();

    return yyyy + '-' + (mm<10 ? '0' : '') + mm + '-' + (dd<10 ? '0' : '') + dd;
  }
}
