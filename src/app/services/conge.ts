import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  private apiUrl = 'http://127.0.0.1:8000/api/conges';

  constructor(private http: HttpClient) { }

  getConges(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getConge(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addConge(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateConge(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteConge(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}