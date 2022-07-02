import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IMenu } from '../../models/menu'

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private url: string = environment.API_URL

    constructor(
        private http: HttpClient,
    ) {
    }

    consultarMenu(id: string): Observable<any> {
        return this.http.get<IMenu>(`${this.url}/menu/obtenerMenu/${id}`)
    }

    consultarMenuByBar(id: string): Observable<any> {
        return this.http.get<IMenu>(`${this.url}/menu/obtenerMenuByBar/${id}`)
    }
}
