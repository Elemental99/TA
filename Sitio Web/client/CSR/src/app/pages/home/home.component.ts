import { Component, OnInit } from '@angular/core'
import { CookieServices } from '../../services/cookie.service'

@Component( {
    selector   : 'app-home',
    templateUrl: './home.component.html',
    styleUrls  : ['./home.component.css'],
} )

export class HomeComponent implements OnInit {
    public isLoggedIn$ = this.cookieService.isLoggedIn

    constructor(
        private readonly cookieService: CookieServices,
    ) { }

    ngOnInit(): void {
    }
}
