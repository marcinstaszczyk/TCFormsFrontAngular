import { FormsService } from './services/forms.service';
import { HttpClientModule } from '@angular/common/http';
import { DictionariesService } from './services/dictionaries.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormEditComponent } from './form-edit/form-edit.component';
import { FormsModule } from '@angular/forms';
import { InputTextComponent } from './input-text/input-text.component';
import { InputWrapperComponent } from './input-wrapper/input-wrapper.component';
import { MaxlengthDirective } from './validators/maxlength.directive';
import { MaxNumberValidator, MinNumberValidator } from './validators/validate-number.directive';
import { MinDateValidator, MaxDateValidator } from './validators/validate-date.directive';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    FormEditComponent,
    InputTextComponent,
    InputWrapperComponent,
    MaxlengthDirective,
    MaxNumberValidator,
    MinNumberValidator,
    MaxDateValidator,
    MinDateValidator,
    MainDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //CustomFormsModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    DictionariesService,
    FormsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
