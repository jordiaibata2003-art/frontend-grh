import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private apiUrl = 'http://127.0.0.1:8000/api/contrats';

  constructor(private http: HttpClient) { }

  getContrats(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getContrat(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addContrat(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateContrat(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteContrat(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}