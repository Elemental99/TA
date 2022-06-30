import { Component, OnInit } from '@angular/core';
// import { BarService } from 'src/app/services/bar.service'
// import { ClientService } from 'src/app/services/clientService.service'
// import { PlatoService } from 'src/app/services/plato.service'
import { ReservationService } from 'src/app/services/reservation.service'
import { IReservacion } from 'src/models/reservation'
import { IClient } from '../../../../models/client'
import { IBar } from '../../../../models/bar'
import { IPlato } from '../../../../models/plato'
import { ClientService } from 'src/app/services/clientService.service';

@Component({
  selector: 'app-consultar-reservations',
  templateUrl: './consultar-reservations.component.html',
  styleUrls: ['./consultar-reservations.component.css']
})
export class ConsultarReservationsComponent implements OnInit {

  public reservacion: any
  public cliente: any
  private readonly token: string | any

  constructor(
    private reservationServices: ReservationService,
    private readonly clientServices: ClientService
) {
  this.token = this.clientServices.getToken()

}

ngOnInit(): void {
  this.consultar_reservacion()
}



consultar_reservacion(): void {
  this.reservationServices.consultar_reservacion(this.token).subscribe(
      response => {
        this.reservacion = response
        console.log(response)
      },
      error => {  
          console.error(error)

      }
  )
}


}
