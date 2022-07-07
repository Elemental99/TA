import { Component, OnInit } from '@angular/core'
import { ClientService } from '../../services/clientService.service'
import { CookieServices } from '../../services/cookie.service'

@Component( {
    selector   : 'app-home',
    templateUrl: './home.component.html',
    styleUrls  : ['./home.component.css'],
} )

export class HomeComponent implements OnInit {
    private cookie: string | any
    public clientName: string | undefined
    public isLoggedIn$ = this.cookieService.isLoggedIn

    constructor(
        private readonly cookieService: CookieServices,
        private readonly clientService: ClientService,
    ) { }

    ngOnInit(): void {
        this.cookie = this.cookieService.getCookie()
        if ( this.cookie ) {
            this.getUserLogged( this.cookie )
        }
    }

    getUserLogged( id: string ): void {
        this.clientService.getClient( id ).subscribe( client => {
            this.clientName = client.cliente.nombre_cliente
        } )
    }
}
