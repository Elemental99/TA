import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IBar } from '../../models/bar'

@Injectable({
    providedIn : 'root',
})
export class BarService {
    private url: string = environment.API_URL

    constructor(
        private http: HttpClient,
    ) {
    }

    consultarBares(): Observable<any> {
        return this.http.get<IBar>(`${this.url}/bar`)
    }

    consultarBar(id: string): Observable<any> {
        return this.http.get<IBar>(`${this.url}/bar/${id}`)
    }
}
