import express, { Express, Router } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { dbConnection } from './database/config'
import routeBar from './routes/bar'
import routeCliente from './routes/cliente'
import routeMenu from './routes/menu'
import routePlato from './routes/plato'
import routeReservacion from './routes/reservacion'
import { notFound } from './middlewares/notFound'

export class Server {
    public app: Router
    public router: Router
    public port: string | number
    private paths: { [key: string]: string }
    private _express: Express

    constructor() {
        this.app    = Router()
        this.router = Router()
        this.port   = Number( process.env.PORT ) || 4100
        this.paths  = {
            bar        : '/api/bar',
            cliente    : '/api/cliente',
            menu       : '/api/menu',
            plato      : '/api/plato',
            reservacion: '/api/reservacion',
        }
        this.conectarDB().then()
        this.middlewares()
        this.routes()
        this.router.use( '/v1/sextoA', this.app )
        this._express = express().use( this.router )
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        this.app.use( cors() )
        this.app.use( express.json() )
        this.app.use( express.urlencoded( { extended: true } ) )
        this.app.use( cookieParser() )
    }

    routes() {
        this.app.use( this.paths.bar, routeBar )
        this.app.use( this.paths.cliente, routeCliente )
        this.app.use( this.paths.menu, routeMenu )
        this.app.use( this.paths.plato, routePlato )
        this.app.use( this.paths.reservacion, routeReservacion )
        this.app.use( notFound )
    }

    listen() {
        this._express.listen( this.port, () => {
            console.log( `Servidor corriendo en el puerto ${this.port}` )
        } )
    }
}
