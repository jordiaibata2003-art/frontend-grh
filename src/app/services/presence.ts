import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  private apiUrl = 'http://127.0.0.1:8000/api/presences';

  constructor(private http: HttpClient) { }

  getPresences(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPresence(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addPresence(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updatePresence(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deletePresence(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}