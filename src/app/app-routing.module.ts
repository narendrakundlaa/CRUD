import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { CreateForm2Component } from './employee/create-form2/create-form2.component';
import { MaleDetailsComponent } from './employee/male-details/male-details.component';
import { FemaleDetailsComponent } from './employee/female-details/female-details.component';
import { CanDeactivateGuard } from './can-deactivate-guard.service';

const routes: Routes = [
  { path: 'list', component: ListEmployeesComponent },
  { path: 'create', component: CreateEmployeeComponent },
  {
    path: 'create-two', component: CreateForm2Component,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'edit/:id', component: CreateEmployeeComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  { path: 'view-male/:id', component: MaleDetailsComponent },
  { path: 'view-female/:id', component: FemaleDetailsComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
