import { Component, OnInit } from '@angular/core'
import { BarService } from 'src/app/services/bar.service'

@Component({
    selector   : 'app-index-bar',
    templateUrl: './index-bar.component.html',
    styleUrls  : ['./index-bar.component.css']
})
export class IndexBarComponent implements OnInit {
    public bares: any

    // public filtrotext: any;

    constructor(
        private barService: BarService
    ) { }

    ngOnInit(): void {
        this.consultar_bares()
    }

    // buscar(buscarForm: {value:{filtro:any}}){
    //   this.barService.consultar_bares(buscarForm.value.filtro).subscribe(
    //     response=>{
    //       this.bares = response.bares
    //     }
    //   )
    // }

    consultar_bares(): void {
        this.barService.consultar_bares().subscribe(
            response => {
                this.bares = response.bares
            },
            error => {
                console.error(error)
            }
        )
    }

}
