import { Component, OnInit } from '@angular/core'
import { ReservationService } from 'src/app/services/reservation.service'
import { ClientService } from 'src/app/services/clientService.service'
import { IReservacion } from '../../../../models/reservation'
import { DatePipe } from '@angular/common'

@Component({
    selector    : 'app-consultar-reservations',
    templateUrl : './consultar-reservations.component.html',
    styleUrls   : ['./consultar-reservations.component.css'],
    providers   : [DatePipe],
})
export class ConsultarReservationsComponent implements OnInit {
    public reservacion: IReservacion[] | any = []
    private readonly token: string | any

    constructor(
        private reservationServices: ReservationService,
        private readonly clientServices: ClientService,
        private readonly datePipe: DatePipe,
    ) {
        this.token = this.clientServices.getToken()
    }

    ngOnInit(): void {
        this.consultar_reservacion()
    }

    consultar_reservacion(): void {
        this.reservationServices.consultarReservacion(this.token).subscribe(
            response => {
                const data       = response.reservacion
                this.reservacion = data.map((reservacion: any) => {
                    return {
                        ...reservacion,
                        fecha : this.datePipe.transform(
                            reservacion.fecha,
                            'longDate',
                        ),
                    }
                })
            },
            error => {
                console.error(error)
            },
        )
    }

    eliminarReserva(id: string): void {
        this.reservationServices.eliminarReservacion(id).subscribe(
            () => {
                this.consultar_reservacion()
            },
            error => {
                console.error(error)
            },
        )
    }
}
