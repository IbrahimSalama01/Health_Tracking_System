import { computed, inject, Injectable, signal } from '@angular/core';
import { Doctor } from '../../../utils/Interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private http = inject(HttpClient);
  private _oldDoctors  = signal<Doctor[]>([]);
  private _currentDoctor = signal<Doctor[]>([]);

readonly oldDoctors = computed(()=>this._oldDoctors());
readonly currentDoctor = computed(()=>this._currentDoctor());

  constructor() { }
  fetchDoctors() {
    console.log("fetching",environment.API_URL + '/doctors');
    this.http.get<{currentDoctors:Doctor[],oldDoctors:Doctor[]}>(environment.API_URL + '/doctors').pipe(
      tap((data) => {
        console.log("data",data);
        this._oldDoctors.set(data.oldDoctors);
        this._currentDoctor.set(data.currentDoctors);
      }),
      catchError((error) => {
        console.error('Error fetching doctors:', error);
        return [];
      })
    ).subscribe();
  }
}
