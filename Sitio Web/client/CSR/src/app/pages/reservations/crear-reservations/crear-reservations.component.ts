import { Component, OnInit } from '@angular/core'
import { BarService } from '../../../services/bar.service'
import { ClientService } from '../../../services/clientService.service'
import { PlatoService } from '../../../services/plato.service'
import { ReservationService } from '../../../services/reservation.service'
import { IReservacion } from '../../../shared/models/reservation'
import { ActivatedRoute, Router } from '@angular/router'
import { IClient } from '../../../shared/models/client'
import { IBar } from '../../../shared/models/bar'
import { IPlato } from '../../../shared/models/plato'
import { MenuService } from '../../../services/menu.service'
import { DatePipe } from '@angular/common'
import { CookieServices } from '../../../services/cookie.service'

@Component( {
    selector   : 'app-crear-reservations',
    templateUrl: './crear-reservations.component.html',
    styleUrls  : ['./crear-reservations.component.css'],
    providers  : [DatePipe],
} )
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

    constructor(
        private readonly clientServices: ClientService,
        private readonly barServices: BarService,
        private readonly platoServices: PlatoService,
        private readonly reservationServices: ReservationService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly menuServices: MenuService,
        private readonly datePipe: DatePipe,
        private readonly cookieService: CookieServices,
    ) {
        this.token = this.cookieService.getCookie()
    }

    ngOnInit(): void {
        this.obtenerClientes()
        this.obtenerBares()
        this.cargarDatosReservacion()
    }

    obtenerClientes(): void {
        this.clientServices.getClient( this.token ).subscribe(
            ( response: any ) => {
                this.cliente = response.cliente
            },
        )
    }

    obtenerBares(): void {
        this.barServices.consultarBares().subscribe(
            ( response: any ) => {
                this.bar = response
            },
        )
    }

    crearReservacion(): void {
        const reservacion: IReservacion = {
            idcliente  : this.token,
            idmenu     : this.idMenu,
            fecha      : this.fecha,
            hora       : this.hora,
            descripcion: this.descripcion,

        }
        if ( reservacion.idmenu && reservacion.fecha && reservacion.hora &&
            reservacion.descripcion ) {
            this.reservationServices.crearReservacion( reservacion ).subscribe(
                () => {
                    this.router.navigate( ['/home'] ).then()
                } )
        } else {
            alert( 'Todos los campos son obligatorios' )
        }
    }

    cargarDatosReservacion(): void {
        this.activatedRoute.params.subscribe( ( { id: _id } ) => {
            this.id = _id
            if ( this.id ) {
                this.reservationServices.consultarReservacionById( this.id )
                    .subscribe(
                        ( response: any ) => {
                            this.idMenu      = response.reservacion.idmenu
                            this.fecha       = this.datePipe.transform(
                                response.reservacion.fecha,
                                'yyyy-MM-dd',
                                'UTC',
                            )
                            this.hora        = response.reservacion.hora
                            this.descripcion = response.reservacion.descripcion
                            this.menuServices.consultarMenu( this.idMenu )
                                .subscribe(
                                    ( response: any ) => {
                                        const idPlato = response.menu.idplato
                                        const idBar   = response.menu.idbar
                                        this.consultMenuByBar( idBar )
                                        this.platoServices.consultarPlato( idPlato )
                                            .subscribe(
                                                ( response: any ) => {
                                                    this.nombrePlato = response.plato.nombre_plato
                                                },
                                            )
                                        this.barServices.consultarBar( idBar ).subscribe(
                                            ( response: any ) => {
                                                this.nombreBar = response.nombre
                                                this.obtenerBares()
                                            },
                                        )
                                    } )
                        },
                    )
            }
        } )
    }

    modificarReservacion(): void {
        const reservacion: IReservacion = {
            idcliente  : this.token,
            idmenu     : this.idMenu,
            fecha      : this.fecha,
            hora       : this.hora,
            descripcion: this.descripcion,

        }
        if ( reservacion.idmenu && reservacion.fecha && reservacion.hora &&
            reservacion.descripcion ) {
            this.reservationServices.modificarReservacion( this.id, reservacion )
                .subscribe(
                    () => {
                        this.router.navigate( ['/home'] ).then()
                    } )
        } else {
            alert( 'Todos los campos son obligatorios' )
        }
    }

    selectBar( event: any ): void {
        this.idBar = event.target.value
        this.consultMenuByBar( this.idBar )
    }

    selectMenu( $event: any ) {
        const idPlato = $event.target.value
        this.menuServices.consultarMenuByPlato( idPlato ).subscribe(
            ( response: any ) => {
                this.idMenu = response.menu._id
            },
        )
    }

    consultMenuByBar( idBar: string ): void {
        this.menuServices.consultarMenuByBar( idBar )
            .subscribe(
                ( response: any ) => {
                    this.plato = response.menu.map( ( response: any ) => {
                        return response.idplato
                    } )
                },
            )
    }
}