import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { distinct, Observable, observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  public url; 
  constructor( 
    private http: HttpClient
  ) { 
    this.url = environment.API_URL
    }

    crear_reservacion(data: any): Observable<any> {
      return this.http.post(
          `${ this.url }/reservacion`,
          data,
      )
  } 
}
