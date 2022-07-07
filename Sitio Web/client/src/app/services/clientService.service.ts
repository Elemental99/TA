import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IClient } from '../../models/client'
import { environment } from '../../environments/environment'

@Injectable(
    {
        providedIn: 'root',
    } )

export class ClientService {
    private url: string = environment.API_URL

    constructor(
        private http: HttpClient,
    ) {}

    register( client: IClient ): Observable<any> {
        return this.http.post<IClient>(
            `${this.url}/cliente`,
            client,
        )
    }

    getClient( id: string ): Observable<any> {
        return this.http.get<IClient>(
            `${this.url}/cliente/obtenerCliente/${id}`,
        )
    }
}
