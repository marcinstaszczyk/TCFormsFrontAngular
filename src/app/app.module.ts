import { IsAdminGuard } from './guards/is-admin.guard';
import { UserService } from './services/user.service';
import { LoginService } from './services/login.service';
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
import { FormViewComponent } from './form-view/form-view.component';
import { NewLineToBrPipe } from './pipes/new-line-to-br.pipe';
import { LoginComponent } from './login/login.component';
import { FormsListComponent } from './forms-list/forms-list.component';

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
    MainDashboardComponent,
    FormViewComponent,
    NewLineToBrPipe,
    LoginComponent,
    FormsListComponent
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
    FormsService,
    LoginService,
    UserService,
    IsAdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
