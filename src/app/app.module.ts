import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { CreateForm2Component } from './employee/create-form2/create-form2.component';
import { MaleDetailsComponent } from './employee/male-details/male-details.component';
import { FemaleDetailsComponent } from './employee/female-details/female-details.component';
import { GrdFilterPipe } from './employee/filter.pipe';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { DialogService } from './dialog.service';


@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    ListEmployeesComponent,
    CreateForm2Component,
    MaleDetailsComponent,
    FemaleDetailsComponent,
    GrdFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CanDeactivateGuard, DialogService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
