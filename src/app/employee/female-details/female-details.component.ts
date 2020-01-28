import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/IEmployee.model';

@Component({
  selector: 'app-female-details',
  templateUrl: './female-details.component.html',
  styleUrls: ['./female-details.component.css']
})
export class FemaleDetailsComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
    // tslint:disable-next-line:align
    private route: ActivatedRoute,
    // tslint:disable-next-line:align
    private router: Router
) { }
employees: IEmployee;
private id: number;
ngOnInit() {
// this.employee = this._employeeService.getEmployee(this._id);
this.route.paramMap.subscribe(paramData => {
this.id = +paramData.get('id');
// tslint:disable-next-line:align
this.employeeService.getEmployee(this.id).subscribe((employee) => this.employees = employee);
});
}
Edit(id: number) {
// this.router.navigate(['create', id]);
this.router.navigate(['edit', id]);
}

}
