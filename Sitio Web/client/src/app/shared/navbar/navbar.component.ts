import { Component, OnInit } from '@angular/core';
import { clientService } from '../../services/clientService.service';

@Component(
    {
        selector   : 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls  : ['./navbar.component.css']
    })
export class NavbarComponent implements OnInit {
    public user$ = this.clientService.client$;

    constructor(
        private readonly clientService: clientService,
    ) { }

    ngOnInit(): void {
    }

    logout(): void {
        this.clientService.deleteToken();
    }

}
