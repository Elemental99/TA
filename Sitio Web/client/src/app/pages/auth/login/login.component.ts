import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IUser } from '../../../shared/models/login'
import { CookieServices } from '../../../services/cookie.service'

@Component( {
    selector   : 'app-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.css'],
} )
export class LoginComponent implements OnInit {
    public user: string | undefined
    public password: string | undefined

    constructor(
        private readonly router: Router,
        private readonly cookieService: CookieServices,
    ) { }

    ngOnInit(): void {
    }

    login(): void {
        const client: IUser = {
            user    : String( this.user ),
            password: String( this.password ),
        }
        this.cookieService.login( client )
            .subscribe( () => {
                this.router.navigateByUrl( '/home' ).then()
            } )
    }
}
