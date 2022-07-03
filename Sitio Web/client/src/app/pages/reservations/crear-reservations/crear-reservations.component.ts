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
import { DatePipe } from '@angular/common'

@Component({
    selector   : 'app-crear-reservations',
    templateUrl: './crear-reservations.component.html',
    styleUrls  : ['./crear-reservations.component.css'],
    providers  : [DatePipe],
})
export class CrearReservationsComponent implements OnInit {
    public cliente: IClient[] | any = []
    public bar: IBar[] | any        = []
    public plato: IPlato[] | any    = []
    public fecha: Date | any
    public hora: string | any
    public descripcion: string | any
    public id: string | any
    public titulo: string           = 'Reservación'
    public nombrePlato: string | undefined
    public nombreBar: string | undefined
    private idMenu: string | any
    private idBar: string | any
    private readonly token: string | any
    private readonly reservacion: IReservacion

    constructor(
        private readonly clientServices: ClientService,
        private readonly barServices: BarService,
        private readonly platoServices: PlatoService,
        private readonly reservationServices: ReservationService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly menuServices: MenuService,
        private readonly datePipe: DatePipe,
    ) {
        this.token       = this.clientServices.getToken()
        this.reservacion = {
            idcliente  : this.token,
            idmenu     : this.idMenu,
            fecha      : this.fecha,
            hora       : this.hora,
            descripcion: this.descripcion,
        }
    }

    ngOnInit(): void {
        this.obtenerClientes()
        this.obtenerBares()
        this.cargarDatosReservacion()
    }

    obtenerClientes(): void {
        this.clientServices.getClient(this.token).subscribe(
            (response: any) => {
                this.cliente = response.cliente
            },
        )
    }

    obtenerBares(): void {
        this.barServices.consultarBares().subscribe(
            (response: any) => {
                this.bar = response.bares
            },
        )
    }

    crearReservacion(): void {
        this.reservationServices.crearReservacion(this.reservacion).subscribe(
            () => {
                this.router.navigate(['/home']).then()
            })
    }

    cargarDatosReservacion(): void {
        this.activatedRoute.params.subscribe(({ id: _id }) => {
            this.id = _id
            if (this.id) {
                this.reservationServices.consultarReservacionById(this.id)
                    .subscribe(
                        (response: any) => {
                            this.idMenu      = response.reservacion.idmenu
                            this.fecha       = this.datePipe.transform(
                                response.reservacion.fecha,
                                'yyyy-MM-dd',
                            )
                            this.hora        = response.reservacion.hora
                            this.descripcion = response.reservacion.descripcion
                            this.menuServices.consultarMenu(this.idMenu)
                                .subscribe(
                                    (response: any) => {
                                        const idPlato = response.menu.idplato
                                        const idBar   = response.menu.idbar
                                        this.consultMenuByBar(idBar)
                                        this.platoServices.consultarPlato(idPlato)
                                            .subscribe(
                                                (response: any) => {
                                                    this.nombrePlato = response.plato.nombre_plato
                                                },
                                            )
                                        this.barServices.consultarBar(idBar).subscribe(
                                            (response: any) => {
                                                this.nombreBar = response.bar.nombre
                                                this.obtenerBares()
                                            },
                                        )
                                    })
                        },
                    )
            }
        })
    }

    modificarReservacion(): void {
        this.reservationServices.modificarReservacion(this.id, this.reservacion)
            .subscribe(
                () => {
                    this.router.navigate(['/home']).then()
                })
    }

    selectBar(event: any): void {
        this.idBar = event.target.value
        this.consultMenuByBar(this.idBar)
    }

    selectMenu($event: any) {
        const idPlato = $event.target.value
        this.menuServices.consultarMenuByPlato(idPlato).subscribe(
            (response: any) => {
                this.idMenu = response.menu._id
            },
        )
    }

    consultMenuByBar(idBar: string): void {
        this.menuServices.consultarMenuByBar(idBar)
            .subscribe(
                (response: any) => {
                    this.plato = response.menu.map((response: any) => {
                        return response.idplato
                    })
                },
            )
    }
}
