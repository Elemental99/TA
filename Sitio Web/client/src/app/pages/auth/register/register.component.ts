import { Component, OnInit } from '@angular/core'
import { IClient } from '../../../../models/client'
import { ClientService } from '../../../services/clientService.service'
import { Router } from '@angular/router'

@Component(
    {
        selector   : 'app-register',
        templateUrl: './register.component.html',
        styleUrls  : ['./register.component.css']
    })
export class RegisterComponent implements OnInit {
    public clientName: string | any
    public identificationCard: string | any
    public age: number | any
    public phone: number | any
    public faculty: string | any
    public user: string | any
    public password: string | any

    constructor(
        private readonly clientService: ClientService,
        private readonly router: Router
    ) { }

    ngOnInit(): void {
    }

    register(): void {
        const client: IClient = {
            nombre_cliente: this.clientName,
            cedula        : this.identificationCard,
            edad          : this.age,
            telefono      : this.phone,
            facultad      : this.faculty,
            user          : this.user,
            password      : this.password
        }
        this.clientService.register(client).subscribe(
            data => {
                this.clientService.setToken(data.token)
                this.router.navigateByUrl('/login').then()
            },
            error => {
                console.log(error)
            }
        )
    }
}
