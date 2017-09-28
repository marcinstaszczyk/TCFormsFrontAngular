import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation'

import { environment } from './../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { IsAdminGuard } from './guards/is-admin.guard';
import { DictionariesService, NodeDictionariesService, FirebaseDictionariesService } from './services/dictionaries.service';
import { FormsService, NodeFormsService, FirebaseFormsService } from './services/forms.service';
import { LoginService, NodeLoginService, FirebaseLoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { FormEditComponent } from './form-edit/form-edit.component';
import { FormViewComponent } from './form-view/form-view.component';
import { FormsListComponent } from './forms-list/forms-list.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputWrapperComponent } from './input-wrapper/input-wrapper.component';
import { MaxlengthDirective } from './validators/maxlength.directive';
import { MaxNumberValidator, MinNumberValidator } from './validators/validate-number.directive';
import { MinDateValidator, MaxDateValidator } from './validators/validate-date.directive';
import { NewLineToBrPipe } from './pipes/new-line-to-br.pipe';

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
    { provide: DictionariesService, useClass: environment.firebaseConfig ? FirebaseDictionariesService : NodeDictionariesService },
    { provide: FormsService, useClass: environment.firebaseConfig ? FirebaseFormsService : NodeFormsService },
    { provide: LoginService, useClass: environment.firebaseConfig ? FirebaseLoginService : NodeLoginService },
    UserService,
    IsAdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
