// import { Injectable } from '@angular/core';
// import { IClient } from '../../models/client';
// import { CookieService } from 'ngx-cookie-service';
// import { BehaviorSubject } from 'rxjs';
// import { IUser } from '../../models/login';
//
// @Injectable(
//     {
//         providedIn: 'root'
//     })
//
// export class cookieService {
//     private observable = new BehaviorSubject<IUser | null>(null);
//
//     constructor( private cookies: CookieService) {}
//
//     setToken(data: IClient | any): void {
//         this.cookies.set('token', data, 1);
//     }
//
//     getToken(): string {
//         return this.cookies.get('token');
//     }
//
//     checkToken(): boolean {
//         return this.cookies.check('token');
//     }
//
//     deleteToken(): void {
//         this.observable.next(null);
//         return this.cookies.delete('token');
//     }
// }
