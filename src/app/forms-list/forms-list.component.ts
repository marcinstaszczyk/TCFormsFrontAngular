import { MessagesService } from './../services/messages.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Form } from './../model/form';
import { FormsService } from './../services/forms.service';

@Component({
  selector: 'tcf-forms-list',
  templateUrl: './forms-list.component.html',
  styles: []
})
export class FormsListComponent implements OnInit {

  formsList = new Array<Form>();
  showDetails = false;
  selectedForm: Form;
  selectedToDeleteForm: Form;

  constructor(private formsService: FormsService, private messagesService: MessagesService, private router: Router) { }

  ngOnInit() {
    this.formsService.getFormsList().subscribe(
      (list) => { this.formsList = list; },
      (error) => { this.messagesService.showError('Błąd wczytywania listy form: ' + error) }
    );
  }

  onShowDetailsToggle() {
    this.showDetails = !this.showDetails;
  }

  onFormSelected(form: any) {
    this.selectedForm = form;
    this.selectedToDeleteForm = null;
  }

  onEditForm() {
    this.router.navigate(['/edit', this.selectedForm.id]);
  }

  onDelete() {
    this.selectedToDeleteForm = this.selectedForm;
  }
  onConfirmDelete() {
    this.formsService.deleteForm(this.selectedToDeleteForm).subscribe(
      () => this.formsService.getFormsList().subscribe(
        (list) => { this.formsList = list; },
        (error) => { this.messagesService.showError('Błąd wszytywnia uaktualnionej listy form: ' + error) }
      ),
      (error) => { this.messagesService.showError('Błąd usuwania formy: ' + error) }
    );
    this.selectedForm = null;
    this.selectedToDeleteForm = null;
  }
}
