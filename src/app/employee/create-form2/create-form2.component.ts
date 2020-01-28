import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../../IEmployee.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../employee.service';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/dialog.service';

@Component({
  selector: 'app-create-form2',
  templateUrl: './create-form2.component.html',
  styleUrls: ['./create-form2.component.css']
})
export class CreateForm2Component implements OnInit {

  employeeForm: FormGroup;
  employee: IEmployee;


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
        this.getEmployeeById(ReceiveEmpId);
      } else {
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
    this.employee.gender = this.employeeForm.value.gender;
    this.employee.email = this.employeeForm.value.email;
  }
  canDeactivate(): Observable<boolean> | boolean {
    if ( this.employeeForm.dirty) {
          return this.dialogService.confirm('Discard changes for Person?');
    }
    return true;
}
}
