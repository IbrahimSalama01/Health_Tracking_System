import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {
  private _httpClient = inject(HttpClient);
  private specializationUrl = `${environment.API_URL}/specializations`;
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  
  getSpecializations(): Observable<any> {
    return this._httpClient.get<any>(`${this.specializationUrl}`, { 
      headers: this.getHeaders() 
    });
  }
}
