import { Component, OnInit } from '@angular/core';
import { clientService } from '../../services/clientService.service';

@Component(
    {
        selector   : 'app-home',
        templateUrl: './home.component.html',
        styleUrls  : ['./home.component.css']
    })
export class HomeComponent implements OnInit {
    private cookie: string | undefined;
    public client: string | undefined;

    constructor(
        private readonly clientService: clientService,
    ) { }

    ngOnInit(): void {
        this.cookie = this.clientService.getToken();
        this.getUserLogged(this.cookie);
    }

    getUserLogged(id: string): void {
        this.clientService.getClient(id).subscribe(client => {
            this.client = client.cliente.nombre_cliente;
        });
    }

}
