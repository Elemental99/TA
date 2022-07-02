import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class PlatoService {
    private url: string = environment.API_URL

    constructor(
        private http: HttpClient,
    ) {
    }

    consultar_platos(): Observable<any> {
        return this.http.get(`${this.url}/plato`)
    }

    consultarPlato(id: string): Observable<any> {
        return this.http.get(`${this.url}/plato/${id}`)
    }
}
