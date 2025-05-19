import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {
  private apiUrl = `${environment.API_URL}/specializations`;

  constructor(private http: HttpClient) {}

    getSpecializations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching specializations:', error);
        return of([]); // Return empty array on error
      })
    );
  }
}
