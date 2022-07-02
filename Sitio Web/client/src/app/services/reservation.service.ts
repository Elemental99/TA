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

    crear_reservacion(data: IReservacion): Observable<any> {
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

    consultarReservacionById(id: string): Observable<any> {
        return this.http.get<IReservacion>(
            `${this.url}/reservacion/obtenerReservacion/${id}`,
        )
    }

    eliminar_reservacion(id: string): Observable<any> {
        return this.http.delete<IReservacion>(
            `${this.url}/reservacion/${id}`,
        )
    }

    modificar_reservacion(id: string, data: IReservacion): Observable<any> {
        return this.http.put<IReservacion>(
            `${this.url}/reservacion/${id}`, data,
        )
    }
}
