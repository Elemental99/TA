import { Component, OnInit } from '@angular/core'
import { BarService } from '../../../services/bar.service'
import { IBar } from '../../../../models/bar'

@Component({
    selector   : 'app-index-bar',
    templateUrl: './index-bar.component.html',
    styleUrls  : ['./index-bar.component.css'],
})
export class IndexBarComponent implements OnInit {
    public bares: IBar[] | any = []

    // public filtrotext: any;

    constructor(
        private barService: BarService,
    ) { }

    async ngOnInit(): Promise<void> {
        await this.consultar_bares()
    }

    // buscar(buscarForm: {value:{filtro:any}}){
    //   this.barService.consultar_bares(buscarForm.value.filtro).subscribe(
    //     response=>{
    //       this.bares = response.bares
    //     }
    //   )
    // }

    consultar_bares(): void {
        this.barService.consultarBares().subscribe(
            (response: any) => {
                this.bares = response
            },
        )
    }
}
