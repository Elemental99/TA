import { Component, OnInit } from '@angular/core'
import { CookieServices } from '../../services/cookie.service'

@Component({
    selector   : 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls  : ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    public isLoggedIn$ = this.cookieService.isLoggedIn

    constructor(
        private readonly cookieService: CookieServices,
    ) { }

    ngOnInit(): void {
    }

    logout(): void {
        this.cookieService.removeAllCookies()
    }
}
