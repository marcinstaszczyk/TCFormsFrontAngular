import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { FormEditComponent } from './form-edit/form-edit.component';
import { FormNewComponent } from './form-new/form-new.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'new', component: FormEditComponent },
  { path: '', component: MainDashboardComponent },
  { path: 'asdasd', redirectTo: '/new', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
