import { Component, OnInit } from '@angular/core'
import { CookieServices } from '../../services/cookie.service'

@Component(
    {
        selector   : 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls  : ['./navbar.component.css'],
    })
export class NavbarComponent implements OnInit {
    public user$ = this.cookieService.client$

    constructor(
        private readonly cookieService: CookieServices,
    ) { }

    ngOnInit(): void {
    }

    logout(): void {
        this.cookieService.removeAllCookies()
    }
}
