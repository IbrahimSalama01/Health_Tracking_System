import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Checkup } from '../../../../utils/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = `${environment.API_URL}/patients`;
  private apiUrlCheckups = `${environment.API_URL}/checkups`;
  _httpClient = inject(HttpClient);
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  
  getPatients(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}`, { 
      headers: this.getHeaders() 
    });
  }
  
  getPatientById(id: string): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}/${id}`, { 
      headers: this.getHeaders() 
    });
  }

  addCheckup(data: Checkup): Observable<any> {
    return this._httpClient.post<any>(`${this.apiUrlCheckups}`, data, {
      headers: this.getHeaders()
    })
  }

  getCheckups(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrlCheckups}`, { 
      headers: this.getHeaders() 
    });
  }

}