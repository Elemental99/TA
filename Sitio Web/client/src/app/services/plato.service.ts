import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root'
})
export class PlatoService {
    public ruta

    constructor(
        private http: HttpClient
    ) {
        this.ruta = environment.API_URL
    }

    consultar_platos(): Observable<any> {
        const headers = new HttpHeaders().set(
            'Content-Type',
            'application/json'
        )
        return this.http.get(this.ruta + '/plato', { headers: headers })
    }
}
