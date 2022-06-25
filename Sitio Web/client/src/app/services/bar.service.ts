import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class BarService {
    public ruta

    constructor(
        private http: HttpClient
    ) {
        this.ruta = environment.API_URL
    }

    consultar_bares(): Observable<any> {
        const headers = new HttpHeaders().set(
            'Content-Type',
            'application/json'
        )
        return this.http.get(this.ruta + '/bar', { headers: headers })
    }

}
