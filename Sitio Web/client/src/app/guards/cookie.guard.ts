import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { CookieServices } from '../services/cookie.service'

@Injectable( { providedIn: 'root' } )
export class CookieGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly cookieService: CookieServices,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.cookieService.isLoggedIn.pipe(
            map( ( data: any ) => {
                if ( !data ) {
                    this.router.navigate( ['/home'] ).then()
                    return false
                }
                return true
            } ),
        )
    }
}
