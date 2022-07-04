import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { IBar } from '../../models/bar'

@Injectable({
    providedIn: 'root',
})
export class BarService {
    private url: string = environment.API_URL

    constructor(
        private http: HttpClient,
    ) {}

    consultarBares(): Observable<IBar[]> {
        return this.http.get<IBar>(`${this.url}/bar`).pipe(
            map((response: any) => {
                return response.bares
            }),
        )
    }

    consultarBar(id: string): Observable<IBar[]> {
        return this.http.get<IBar>(`${this.url}/bar/${id}`).pipe(
            map((response: any) => {
                return response.bar
            }),
        )
    }
}
