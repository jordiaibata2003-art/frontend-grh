import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaieService {

  private apiUrl = 'http://127.0.0.1:8000/api/paies';

  constructor(private http: HttpClient) { }

  getPaies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPaie(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addPaie(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updatePaie(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deletePaie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}