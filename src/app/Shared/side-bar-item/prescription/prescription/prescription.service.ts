import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription } from '../../../../utils/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = `${environment.API_URL}/prescriptions`;
  private _httpClient = inject(HttpClient);
    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }

  addPrescription(data: Prescription): Observable<any> {
    return this._httpClient.post<any>(`${this.apiUrl}`, data, {
      headers: this.getHeaders()
    });
  }
}
