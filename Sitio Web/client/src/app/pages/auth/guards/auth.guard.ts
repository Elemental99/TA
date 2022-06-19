import { CanActivate, Router, } from '@angular/router'
import { clientService } from '../../../services/clientService.service'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private readonly ClientService: clientService,
        private readonly route: Router
    ) { }

    async canActivate(): Promise<boolean> {
        if ( this.ClientService.getToken() ) {
            await this.route.navigate(
                ['/home'])
            return false
        }
        return true
    }

}
