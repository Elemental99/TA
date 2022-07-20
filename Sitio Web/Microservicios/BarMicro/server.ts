import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { dbConnection } from './config/database'
import routeBar from './routes/bar'
import { notFound } from './middlewares/notFound'

export class Server {
    public app: express.Router
    public router: express.Router
    public port: string | number
    private paths: { [key: string]: string }
    private _express: express.Application

    constructor() {
        this.app    = express.Router()
        this.router = express.Router()
        this.port   = process.env.PORT || 4000
        this.paths  = {
            bar: '/api/bar',
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
        this.app.use( bodyParser.urlencoded( { extended: false } ) )
        this.app.use( express.json() )
    }

    routes() {
        this.app.use( this.paths.bar, routeBar )
        this.app.use( notFound )
    }

    listen() {
        this._express.listen( this.port, () => {
            console.log( `Servidor corriendo en el puerto ${this.port}` )
        } )
    }
}
