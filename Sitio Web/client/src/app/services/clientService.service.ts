import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { IClient } from '../../models/client'
import { environment } from '../../environments/environment'
import { CookieService } from 'ngx-cookie'
import { IUser } from '../../models/login'

@Injectable(
    {
        providedIn: 'root'
    })

export class ClientService {
    private url           = environment.API_URL
    private nameCookie    = environment.nameCookie
    private clientSubject = new BehaviorSubject<string | null>(null)

    constructor(
        private http: HttpClient,
        private cookies: CookieService
    ) {
        this.clientSubject.next(String(this.getToken()))
    }

    get client$(): Observable<string | null> {
        return this.clientSubject.asObservable()
    }

    login(client: IUser): Observable<any> {
        this.setClient()
        return this.http.get<IUser>(
            `${ this.url }/cliente/login`,
            {
                params: {
                    user    : client.user,
                    password: client.password
                }
            }
        )
    }

    register(client: IClient): Observable<any> {
        return this.http.post<IClient>(`${ this.url }/cliente`, client)
    }

    getClient(id: string | undefined): Observable<any> {
        return this.http.get<IClient>(`${ this.url }/cliente/ver/${ id }`)
    }

    private setClient(): void {
        this.clientSubject.next(this.nameCookie)
    }

    setToken(data: IClient | any): void {
        this.cookies.put(
            this.nameCookie,
            data,
            {
                expires: new Date(Date.now() + (24 * 60 * 60 * 1000
                )),
                path   : '/'
            }
        )
    }

    getToken(): string | undefined {
        return this.cookies.get(this.nameCookie)
    }

    deleteToken(): void {
        this.clientSubject.next(null)
        return this.cookies.remove(this.nameCookie)
    }
}
