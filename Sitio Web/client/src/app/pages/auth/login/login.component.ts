import { Component, OnInit } from '@angular/core';
import { clientService } from '../../../services/clientService.service';
import { Router } from '@angular/router';
import { IUser } from '../../../../models/login';

@Component(
    {
        selector   : 'app-login',
        templateUrl: './login.component.html',
        styleUrls  : ['./login.component.css']
    })
export class LoginComponent implements OnInit {
    public user: string | undefined;
    public password: string | undefined;

    constructor(
        private readonly clientService: clientService,
        private readonly router: Router,
    ) {}

    ngOnInit(): void {
    }

    login() {
        const client: IUser = {
            user    : String(this.user),
            password: String(this.password)
        };
        this.clientService.login(client).subscribe(data => {
            this.clientService.setToken(data.datos._id);
            this.router.navigateByUrl('/home').then();
        }, error => {
            console.log(error);
        });
    }
}
