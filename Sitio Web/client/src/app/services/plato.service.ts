import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { IPlato } from '../../models/plato'

@Injectable( {
    providedIn: 'root',
} )
export class PlatoService {
    private url: string = environment.API_URL

    constructor(
        private http: HttpClient,
    ) {
    }

    consultarPlatos(): Observable<any> {
        return this.http.get<IPlato>( `${this.url}/plato` )
    }

    consultarPlato( id: string ): Observable<any> {
        return this.http.get<IPlato>( `${this.url}/plato/${id}` )
    }
}
