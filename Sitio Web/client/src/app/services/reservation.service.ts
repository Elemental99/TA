import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { IReservacion } from '../../models/reservation'

@Injectable({
    providedIn: 'root',
})
export class ReservationService {
    private url: string = environment.API_URL

    constructor(
        private http: HttpClient,
    ) {
    }

    crear_reservacion(data: any): Observable<any> {
        return this.http.post<IReservacion>(
            `${this.url}/reservacion`,
            data,
        )
    }

    consultar_reservacion(id: string): Observable<any> {
        return this.http.get<IReservacion>(
            `${this.url}/reservacion/${id}`,
        )
    }
}
