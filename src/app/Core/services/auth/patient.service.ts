import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { get } from 'http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = `${environment.API_URL}/patients`;
  private token = localStorage.getItem('token');
  private header = new HttpHeaders({
    'Authorization' : `Bearer ${this.token}`
  })

  constructor(private _httpClient: HttpClient) { }
  
  getPatients(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}`, { headers: this.header });
  }
  getPatientById(id: string): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}/${id}`, { headers: this.header });
  }
}
