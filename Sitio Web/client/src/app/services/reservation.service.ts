import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { IReservacion } from 'src/models/reservation'

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    public url

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

    consultar_reservacion(id:string): Observable<any> {
        return this.http.get(this.url + '/reservacion/obtenerReservacion/'+ id)
    }

}
