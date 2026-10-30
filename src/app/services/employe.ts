import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private apiUrl = 'http://127.0.0.1:8000/api/employes';

  constructor(private http: HttpClient) { }

  getEmployes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEmploye(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addEmploye(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateEmploye(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteEmploye(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}