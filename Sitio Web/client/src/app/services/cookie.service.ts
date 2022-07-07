import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie'
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { IUser } from '../../models/login'

@Injectable(
    {
        providedIn: 'root',
    } )

export class CookieServices {
    private url: string = environment.API_URL
    private nameCookie  = environment.nameCookie
    private nameToken   = environment.nameToken
    private loggedIn    = new BehaviorSubject<string>( '' )

    constructor(
        private readonly http: HttpClient,
        private readonly cookieService: CookieService,
    ) {
        this.loggedIn.next( this.getCookie()! )
    }

    login( client: IUser ): Observable<IUser[]> {
        const { user, password } = client
        return this.http.post<IUser>(
            `${this.url}/cliente/login`,
            {
                user,
                password,
            },
        ).pipe(
            tap( ( data: any ) => {
                if ( data ) {
                    console.log( data )
                    this.setToken( this.nameCookie, data.datos._id )
                    this.setToken( this.nameToken, data.jwt )
                    this.loggedIn.next( this.nameCookie )
                    return data
                }
            } ),
            catchError( ( error: any ) => {
                return throwError( error.error.message )
            } ),
        )
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable()
    }

    getCookie(): string | undefined {
        return this.cookieService.get( this.nameCookie )
    }

    getToken(): string | undefined {
        return this.cookieService.get( this.nameToken )
    }

    removeAllCookies(): void {
        this.loggedIn.next( '' )
        return this.cookieService.removeAll()
    }

    private setToken( name: string, data: string ): void {
        this.cookieService.put(
            name,
            data,
            {
                expires: new Date(
                    Date.now() + ( 24 * 60 * 60 * 1000
                    ),
                ),
                path    : '/',
                sameSite: 'lax',
            },
        )
    }
}
