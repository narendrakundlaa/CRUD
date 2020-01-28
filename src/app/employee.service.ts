import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEmployee } from './IEmployee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = 'http://localhost:3000/employees';
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // 'Authorization': 'my-auth-token'
    })
  };

  constructor(private httpClient: HttpClient) { }

  // get list of all employees
  getEmployees(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  // get list of all employees with ID
  getEmployee(id: number): Observable<IEmployee> {
    return this.httpClient.get<IEmployee>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
  // add employee details
  addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.httpClient.post<IEmployee>(this.baseUrl, employee, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  updateEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.httpClient.put<IEmployee>(`${this.baseUrl}/${employee.id}`, employee , this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError));
}
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
