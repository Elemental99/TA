import { Request, Response } from 'express'
import axios from 'axios'
import { environment } from '../environments/environment'

const httpAxios = axios.create( {
    baseURL: environment.url_api,
} )

class UserController {
    constructor() { }

    home( req: Request | any, res: Response ) {
        return res.render( 'home', {
            user: req.datos,
        } )
    }

    login( req: Request | any, res: Response ) {
        const { user, password } = req.body
        httpAxios.post( 'cliente/login', { user, password } )
            .then( ( { data } ) => {
                res.cookie( 'jwt', data.jwt )
                res.cookie( 'id', data.datos._id )
                res.redirect( '/' )
            } )
            .catch( ( error ) => {
                console.log( error )
                return res.render( 'login', {
                    user: req.datos,
                } )
            } )
    }

    register( req: Request | any, res: Response ) {
        const { ...body } = req.body
        httpAxios.post( 'cliente', body )
            .then( () => {
                res.redirect( '/login' )
            } ).catch( ( error ) => {
                console.log( error )
                return res.render( 'register', {
                    user: req.datos,
                } )
            } )
    }
}

export default new UserController()
