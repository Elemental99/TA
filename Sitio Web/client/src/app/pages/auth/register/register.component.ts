import { Component, OnInit } from '@angular/core';
import { IClient } from '../../../../models/client';
import { clientService } from '../../../services/clientService.service';
import { Router } from '@angular/router';

@Component(
    {
        selector   : 'app-register',
        templateUrl: './register.component.html',
        styleUrls  : ['./register.component.css']
    })
export class RegisterComponent implements OnInit {
    public nombre_cliente: string | any;
    public cedula: string | any;
    public edad: number | any;
    public telefono: number | any;
    public facultad: string | any;
    public user: string | any;
    public password: string | any;

    constructor(
        private readonly clientService: clientService,
        private readonly router: Router
    ) { }

    ngOnInit(): void {
    }

    register(): void {
        const client: IClient = {
            nombre_cliente: this.nombre_cliente,
            cedula        : this.cedula,
            edad          : this.edad,
            telefono      : this.telefono,
            facultad      : this.facultad,
            user          : this.user,
            password      : this.password
        };
        this.clientService.register(client).subscribe(
            data => {
                this.clientService.setToken(data.token);
                this.router.navigateByUrl('/login').then();
            },
            error => {
                console.log(error);
            }
        );
    }
}
