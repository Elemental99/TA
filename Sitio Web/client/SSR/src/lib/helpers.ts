import { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import { environment } from '../environments/environment'

const httpAxios = axios.create( {
    baseURL: environment.url_api,
} )

export const verifyToken = (
    req: Request | any,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.cookies
    if ( id ) {
        httpAxios.get( `cliente/obtenerCliente/${id}` )
            .then( ( { data } ) => {
                req.datos = data
                next()
            } )
            .catch( ( error ) => {
                next( error )
            } )
    } else {
        next()
    }
}
