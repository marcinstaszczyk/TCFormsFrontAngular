import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsListComponent } from './forms-list/forms-list.component';
import { LoginComponent } from './login/login.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { FormEditComponent } from './form-edit/form-edit.component';

import { IsAdminGuard } from './guards/is-admin.guard';

const routes: Routes = [
  { path: '', component: MainDashboardComponent },
  { path: 'login', component: LoginComponent,  },
  { path: 'list', component: FormsListComponent, canActivate: [IsAdminGuard] },
  { path: 'edit/:id', component: MainDashboardComponent, canActivate: [IsAdminGuard] },
  //{ path: 'asdasd', redirectTo: '/new', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
