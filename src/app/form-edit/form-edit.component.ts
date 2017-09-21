import { DictionariesService } from '../services/dictionaries.service';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { AfterViewChecked, Component, Input, Output, EventEmitter, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { Form } from '../model/form';
import { dateToDateString } from '../util/js-util';
import { markAsTouchedDeep } from '../util/angular-util';

@Component({
  selector: 'tcf-form-edit',
  templateUrl: './form-edit.component.html',
  styles: []
})
export class FormEditComponent implements OnInit, OnChanges, AfterViewChecked {

  @Input() form = new Form();
  @Output('save') save = new EventEmitter();

  @ViewChild('f') htmlForm: NgForm;

  minStartDate: string;
  maxStartDate: string;

  sAreas: Array<{name: string, sub: Array<string>}>;
  sTypes: Array<string>;
  sOwners: Array<string>;
  sIndex: Array<string>;
  
  indexOptions = new Array<{option: string, checked: boolean}>();

  showIndex = false;
  saveClicked = false;

  constructor(private dictService: DictionariesService) { 
    this.minStartDate = dateToDateString(new Date());

    let date = new Date();
    date.setFullYear(date.getFullYear() + 1)

    this.maxStartDate = dateToDateString(date);
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

  ngOnChanges(changes: SimpleChanges) {
    if ('form' in changes) {
      this.htmlForm.control.markAsPristine();
      this._initForm();
    }
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
    if (this.form.startDate && this.form.startDate.indexOf('Z') >= 0 ) {
      this.form.startDate = dateToDateString(new Date(this.form.startDate));
    }
    this.saveClicked = false;
  }

  get formStartDate() {
    return 0;
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

  onSave() {
    if (this.htmlForm.invalid) {
      markAsTouchedDeep(this.htmlForm.control);
      this.saveClicked = true;
    } else {
      this.save.emit();
    }
  }

  test() {
    console.log(this.htmlForm);

    //let form = new Form();
    //form.name = "aaaaaa";
    //this.form = form;
    //this.htmlForm.form.get('area').setValue('0');

    console.log('zxczxc', this.indexOptions.filter(opt => opt.checked).reduce<number>(((count) => count+1), 0));
  }

  reset() {
    this.htmlForm.reset();
  }
}


