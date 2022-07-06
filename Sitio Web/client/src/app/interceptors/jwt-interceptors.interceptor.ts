import { Injectable } from '@angular/core'
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { Router } from '@angular/router'
import { CookieServices } from '../services/cookie.service'

@Injectable()
export class JwtInterceptorsInterceptor implements HttpInterceptor {
    constructor(
        private readonly cookieService: CookieServices,
        private readonly router: Router,
    ) { }

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        const token = this.cookieService.getToken()
        let req     = request
        if (token) {
            req = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigate(['/home']).then()
                }
                return throwError(error.error.error)
            }),
        )
    }
}
