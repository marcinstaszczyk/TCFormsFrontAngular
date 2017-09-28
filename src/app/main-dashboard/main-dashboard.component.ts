import { MessagesService } from './../services/messages.service';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives';

import { FormsService } from '../services/forms.service';
import { Form } from './../model/form';
import { markAsTouchedDeep } from '../util/angular-util';


@Component({
  selector: 'tcf-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styles: []
})
export class MainDashboardComponent implements OnInit {

  form = new Form();

  showSaveConfirmation = false;
  showUuidInfo = false;

  private routeParamsSubscription: Subscription;

  constructor(private formsService: FormsService, private messagesService: MessagesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeParamsSubscription = this.route.params.subscribe(
      (params: Params) => {
        if (params['id'] === undefined) {
          this.form = new Form();
        } else {
          this.formsService.getForm(params['id']).subscribe(
            (form) => { this.form = form; },
            (error) => { this.messagesService.showError('Błąd wczytywania formy: ' + error) }
          );
        }
      }
    );
  }

  onLoadFormForUUID(form: NgForm, uuid: string) {
    if (form.invalid) {
      markAsTouchedDeep(form.control);
      return;
    } else {
      this.formsService.getFormByUUID(uuid).subscribe(
        (form) => { this.form = form; },
        (error) => { this.messagesService.showError('Błąd wczytywania formy: ' + error) }
      );
    }
  }

  onNewForm() {
    this.form = new Form();
  }

  onSave() {
    this.formsService.saveForm(this.form).subscribe(
      (form) => {
        this.showSaveConfirmation = true;
        this.showUuidInfo = this.form.id == null;

        this.form = form;
      },
      (error) => { this.messagesService.showError('Błąd zapisywania formy: ' + error) }
    )
  }
}

