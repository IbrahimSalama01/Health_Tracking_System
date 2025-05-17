import { computed, inject, Injectable, signal } from '@angular/core';
import { Checkup, Doctor } from '../../../utils/Interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private http = inject(HttpClient);
  private _oldDoctors = signal<Doctor[]>([]);
  private _currentDoctor = signal<Doctor[]>([]);

  private _myOwnCheckups = signal<Checkup[]>([]);
  private _acceptedDoctorCheckups = signal<Checkup[]>([]);

  readonly myOwnCheckups = computed(() => this._myOwnCheckups());
  readonly acceptedDoctorCheckups = computed(() =>
    this._acceptedDoctorCheckups()
  );

  readonly oldDoctors = computed(() => this._oldDoctors());
  readonly currentDoctor = computed(() => this._currentDoctor());

  constructor() {}
  fetchDoctors() {
    console.log('fetching', environment.API_URL + '/doctors');
    this.http
      .get<{ currentDoctors: Doctor[]; oldDoctors: Doctor[] }>(
        environment.API_URL + '/doctors'
      )
      .pipe(
        tap(data => {
          console.log('data', data);
          this._oldDoctors.set(data.oldDoctors);
          this._currentDoctor.set(data.currentDoctors);
        }),
        catchError(error => {
          console.error('Error fetching doctors:', error);
          return [];
        })
      )
      .subscribe();
  }
  fetchCheckups() {
    console.log('fetching', environment.API_URL + '/checkups');
    this.http
      .get<{ myOwnCheckups: Checkup[]; acceptedDoctorCheckups: Checkup[] }>(
        environment.API_URL + '/checkups'
      )
      .pipe(
        tap(data => {
          console.log('data', data);
          this._myOwnCheckups.set(data.myOwnCheckups);
          this._acceptedDoctorCheckups.set(data.acceptedDoctorCheckups);
        }),
        catchError(error => {
          console.error('Error fetching doctors:', error);
          return [];
        })
      )
      .subscribe();
  }
}
