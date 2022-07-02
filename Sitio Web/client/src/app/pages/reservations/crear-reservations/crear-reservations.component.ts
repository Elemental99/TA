import { Component, OnInit } from '@angular/core'
import { BarService } from 'src/app/services/bar.service'
import { ClientService } from 'src/app/services/clientService.service'
import { PlatoService } from 'src/app/services/plato.service'
import { ReservationService } from 'src/app/services/reservation.service'
import { IReservacion } from 'src/models/reservation'
import { ActivatedRoute, Router } from '@angular/router'
import { IClient } from '../../../../models/client'
import { IBar } from '../../../../models/bar'
import { IPlato } from '../../../../models/plato'
import { MenuService } from '../../../services/menu.service'

@Component({
    selector: 'app-crear-reservations',
    templateUrl: './crear-reservations.component.html',
    styleUrls: ['./crear-reservations.component.css'],
})
export class CrearReservationsComponent implements OnInit {
    public cliente: IClient[] | any = []
    public bar: IBar[] | any = []
    public plato: IPlato[] | any = []
    public fecha: Date | any
    public hora: string | any
    public descripcion: string | any
    public id: string | any
    private idCliente: string | any
    private idMenu: string | any
    private idBar: string | any
    private readonly token: string | any

    public titulo: string = 'Reservación'

    constructor(
        private readonly clientServices: ClientService,
        private readonly barServices: BarService,
        private readonly platoServices: PlatoService,
        private readonly reservationServices: ReservationService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly menuServices: MenuService,
    ) {
        this.token = this.clientServices.getToken()
    }

    ngOnInit(): void {
        this.obtenerClientes()
        this.obtenerBares()
        this.cargarReservacion()
    }

    obtenerClientes(): void {
        this.clientServices.getClient(this.token).subscribe(
            (response: any) => {
                this.cliente = response.cliente
            },
        )
    }

    obtenerBares(): void {
        this.barServices.consultar_bares().subscribe(
            (response: any) => {
                this.bar = response.bares
            },
        )
    }

    crearReservacion(): void {
        const reservacion: IReservacion = {
            idcliente: this.token,
            idmenu: this.idMenu,
            fecha: this.fecha,
            hora: this.hora,
            descripcion: this.descripcion,
        }
        this.reservationServices.crear_reservacion(reservacion).subscribe(
            () => {
                this.router.navigate(['/home']).then()
            })
    }

    cargarReservacion(): void {
        this.activatedRoute.params.subscribe(({ id: _id }) => {
            this.id = _id
            if (this.id) {
                this.reservationServices.consultarReservacionById(this.id)
                    .subscribe(
                        (response: any) => {
                            this.idCliente = response.reservacion.idcliente
                            this.idMenu = response.reservacion.idmenu
                            this.fecha = response.reservacion.fecha
                            this.hora = response.reservacion.hora
                            this.descripcion = response.reservacion.descripcion
                            this.clientServices.getClient(this.idCliente).subscribe(
                                (response: any) => {
                                    this.cliente = response.cliente
                                },
                            )
                        },
                    )
            }
        })
    }

    selectBar(event: any): void {
        this.idBar = event.target.value
        this.menuServices.consultarMenuByBar(this.idBar)
            .subscribe(
                (response: any) => {
                    this.plato = response.menu.map((response: any) => {
                        return response.idplato
                    })
                },
            )
    }

    modificarReservacion(): void {
        const reservacion: IReservacion = {
            idcliente: this.token,
            idmenu: this.idMenu,
            fecha: this.fecha,
            hora: this.hora,
            descripcion: this.descripcion,
        }
        this.reservationServices.modificar_reservacion(this.id, reservacion)
            .subscribe(
                () => {
                    this.router.navigate(['/home']).then()
                })
    }

    selectMenu($event: any) {
        this.idMenu = $event.target.value
    }
}
