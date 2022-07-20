import { Component, OnInit } from '@angular/core'
import { IClient } from '../models/client'
import { ClientService } from '../../services/clientService.service'
import { CookieServices } from '../../services/cookie.service'

@Component( {
    selector   : 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls  : ['./perfil.component.css'],
} )
export class PerfilComponent implements OnInit {
    public user: IClient | any

    public token: string | any = this.cookieService.getCookie()

    constructor(
        private clientService: ClientService,
        private readonly cookieService: CookieServices,
    ) {
        this.user = {
            nombre_cliente: '',
            cedula        : '',
            edad          : 0,
            telefono      : 0,
            facultad      : '',
            user          : '',
            password      : '',
        }
    }

    ngOnInit(): void {
        this.getClient()
    }

    getClient() {
        this.clientService.getClient( this.token )
            .subscribe( ( { cliente } ) => {
                this.user = cliente
            } )
    }

    updateUser() {
        this.clientService.updateClient( this.token, this.user )
            .subscribe( ( { clienteActualizado } ) => {
                console.log( clienteActualizado )
            } )
    }
}
