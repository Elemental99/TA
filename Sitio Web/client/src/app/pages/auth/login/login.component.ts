import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ClientService } from '../../../services/clientService.service'
import { IUser } from '../../../../models/login'

@Component(
    {
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css'],
    },
)
export class LoginComponent implements OnInit {
    public user: string | undefined
    public password: string | undefined

    constructor(
        private readonly clientService: ClientService,
        private readonly router: Router,
    ) { }

    ngOnInit(): void {
    }

    login(): void {
        const client: IUser = {
            user: String(this.user),
            password: String(this.password),
        }
        this.clientService.login(client).subscribe(data => {
            console.log(data)
            this.clientService.setToken(data.datos._id)
            this.router.navigateByUrl('/home').then()
        }, (error) => {
            console.error(error)
        }, () => {
            console.log('Login complete')
        })
    }
}
