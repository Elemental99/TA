import { Component, OnInit } from '@angular/core'
import { BarService } from '../../../services/bar.service'
import { IBar } from '../../../shared/models/bar'

@Component( {
    selector   : 'app-index-bar',
    templateUrl: './index-bar.component.html',
    styleUrls  : ['./index-bar.component.css'],
} )
export class IndexBarComponent implements OnInit {
    public bares: IBar[] | any = []

    // public filtrotext: any;

    constructor(
        private barService: BarService,
    ) { }

    async ngOnInit(): Promise<void> {
        await this.consultar_bares()
    }

    consultar_bares(): void {
        this.barService.consultarBares().subscribe(
            ( response: any ) => {
                this.bares = response
            },
        )
    }
}
