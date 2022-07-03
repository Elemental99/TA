import { CanActivate, Router } from '@angular/router'
import { ClientService } from '../../../services/clientService.service'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private readonly clientService: ClientService,
        private readonly route: Router,
    ) { }

    async canActivate(): Promise<boolean> {
        if (this.clientService.getToken()) {
            await this.route.navigate(
                ['/home'])
            return false
        }
        return true
    }
}
