import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../IEmployee.model';
import { Observable } from 'rxjs';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  employee: IEmployee;
  editModeForm: boolean;
  empTitle: string;

  constructor(private fb: FormBuilder,
    // tslint:disable-next-line:align
    private route: ActivatedRoute,
    // tslint:disable-next-line:align
    private employeeService: EmployeeService,
    // tslint:disable-next-line:align
    private router: Router, private dialogService: DialogService) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: [''],
      phone: [''],
      email: [''],
      gender: ['']
    });
    this.route.paramMap.subscribe(param => {
      const ReceiveEmpId = +param.get('id');
      if (ReceiveEmpId) {
        this.editModeForm = true;
        this.empTitle = 'Edit Employee';
        this.getEmployeeById(ReceiveEmpId);
      } else {
        this.empTitle = 'Create Employee';
        this.employee = {
          id: null,
          fullName: '',
          email: '',
          phone: null,
          gender: ''
        };
      }
    });
  }

  getEmployeeById(id: number) {
    this.employeeService.getEmployee(id).subscribe((employee: IEmployee) => {
      this.editEmployee(employee);
      this.employee = employee;

    });
  }
  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      email: employee.email,
      gender: employee.gender
    });
  }
  onSubmit() {
    this.mapFromValuesToEmployee();
    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employee).subscribe(() => {
        this.router.navigate(['list']);
      });
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(() => {
        this.router.navigate(['list']);
      });
    }

  }
  mapFromValuesToEmployee() {
    this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.email = this.employeeForm.value.email;
    this.employee.gender = this.employeeForm.value.gender;
  }
  canDeactivate(): Observable<boolean> | boolean {
    this.employeeForm.markAsTouched();
    if ( this.employeeForm.dirty || this.employeeForm.touched) {
          return this.dialogService.confirm('Are you sure discard the edit changes for ' + this.employeeForm.value.fullName + '?');
    }
    return true;
}

}
