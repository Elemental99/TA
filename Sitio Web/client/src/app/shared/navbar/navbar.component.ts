import { Component, OnInit } from '@angular/core'
import { ClientService } from '../../services/clientService.service'

@Component(
    {
        selector   : 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls  : ['./navbar.component.css']
    })
export class NavbarComponent implements OnInit {
    public user$ = this.clientService.client$

    constructor(
        private readonly clientService: ClientService,
    ) { }

    ngOnInit(): void {
    }

    logout(): void {
        this.clientService.deleteToken()
    }

}
