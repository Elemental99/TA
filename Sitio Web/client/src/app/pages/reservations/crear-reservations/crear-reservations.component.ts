import { Component, OnInit } from '@angular/core';
import { BarService } from 'src/app/services/bar.service';
import { ClientService } from 'src/app/services/clientService.service';
import { PlatoService } from 'src/app/services/plato.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { IReservacion } from 'src/models/reservation';


@Component({
  selector: 'app-crear-reservations',
  templateUrl: './crear-reservations.component.html',
  styleUrls: ['./crear-reservations.component.css']
})
export class CrearReservationsComponent implements OnInit {
    public cliente: any={   //arreglar esto culpa de polito
      nombre_cliente:''  
    }; 
    public bar: any;
    public plato: any;
    public fecha: Date | any;
    public hora: string | any;
    public descripcion: string | any;

    private token: string | any; 
  constructor(
    private clientServices: ClientService,
    private barServices: BarService,
    private platoServices: PlatoService,
    private reservationServices: ReservationService
  ) { 
    this.token = this.clientServices.getToken()
    
  }

  ngOnInit( ): void {
    this.obtenerClientes(),
    this.obtenerBares(),
    this.obtenerPlatos()
  }

  obtenerClientes():void{
    this.clientServices.getClient(this.token).subscribe(
    (response:any)=>{
      this.cliente = response.cliente
    }
  )}

  obtenerBares():void{
    this.barServices.consultar_bares().subscribe(
    (response:any)=>{
      this.bar = response.bares
    }
  )}

  obtenerPlatos():void{
    this.platoServices.consultar_platos().subscribe(
    (response:any)=>{
      this.plato = response.platos
    }
  )}

  crearReservacion():void{  
    const reservacion: IReservacion = {
      idcliente: this.token,
      idmenu: this.plato._id,
      fecha: this.fecha,
      hora: this.hora,
      descripcion: this.descripcion
  }
    this.reservationServices.crear_reservacion(reservacion).subscribe(
    (response:any)=>{
        console.log(response)
    })
  }

}
