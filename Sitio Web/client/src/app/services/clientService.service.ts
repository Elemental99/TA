import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IClient } from '../../models/client';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../../models/login';

@Injectable(
    {
        providedIn: 'root'
    })

export class clientService {
    private url           = environment.API_URL;
    private clientSubject = new BehaviorSubject<string | null>(null);

    constructor(
        private http: HttpClient,
        private cookies: CookieService
    ) {
        this.clientSubject.next(this.getToken());
    }

    get client$(): Observable<string | null> {
        return this.clientSubject.asObservable();
    }

    login(client: IUser): Observable<any> {
        this.setClient();
        return this.http.get(
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
        return this.http.post(`${ this.url }/cliente`, client);
    }

    getClient(id: string): Observable<any> {
        return this.http.get(`${ this.url }/cliente/ver/${ id }`);
    }

    private setClient(): void {
        this.clientSubject.next('token');
    }

    setToken(data: IClient | any): void {
        this.cookies.set('token', data, 1);
    }

    getToken(): string {
        return this.cookies.get('token');
    }

    deleteToken(): void {
        this.clientSubject.next(null);
        return this.cookies.delete('token');
    }

    checkToken(): boolean {
        return this.cookies.check('token');
    }
}
