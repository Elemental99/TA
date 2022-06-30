import { Component, OnInit } from '@angular/core'
import { ReservationService } from 'src/app/services/reservation.service'
import { ClientService } from 'src/app/services/clientService.service'
import { IClient } from '../../../../models/client'
import { IReservacion } from '../../../../models/reservation'

@Component({
    selector: 'app-consultar-reservations',
    templateUrl: './consultar-reservations.component.html',
    styleUrls: ['./consultar-reservations.component.css'],
})
export class ConsultarReservationsComponent implements OnInit {
    public reservacion: IReservacion[] | any = []
    public cliente: IClient[] | any = []
    private readonly token: string | any

    constructor(
        private reservationServices: ReservationService,
        private readonly clientServices: ClientService,
    ) {
        this.token = this.clientServices.getToken()
    }

    ngOnInit(): void {
        this.getClient()
        this.consultar_reservacion()
    }

    getClient(): void {
        this.clientServices.getClient(this.token).subscribe(
            (response: any) => {
                this.cliente = response.cliente
            },
        )
    }

    consultar_reservacion(): void {
        this.reservationServices.consultar_reservacion(this.token).subscribe(
            response => {
                this.reservacion = response.reservacion
            },
            error => {
                console.error(error)
            },
        )
    }
}
