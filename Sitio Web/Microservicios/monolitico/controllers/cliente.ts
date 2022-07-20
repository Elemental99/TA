import { NextFunction, Request, Response } from 'express'
import * as bcrypt from 'bcryptjs'
import { Cliente } from '../models'
import { createToken as jwt } from '../helpers/jwt'
import { ICliente } from '../interfaces'

const saltRounds = 10

export const obtenerClientes = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true }

    try {
        const [total, client]: [Number, ICliente[]] = await Promise.all( [
            Cliente.countDocuments(
                query ),
            Cliente.find(
                query ),
        ] )
        if ( client ) {
            return res.status( 201 )
                .json( {
                    total,
                    client,
                } )
        }
        return res.status( 400 ).send( 'No hay clientes' )
    } catch ( error ) {
        next( error )
    }
}

export const obtenerClienteById = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params

    try {
        const cliente: ICliente | null = await Cliente.findById( id )
        if ( cliente ) return res.status( 201 ).send( { cliente } )
        return res.status( 400 ).send( {
            message: 'No existe el cliente',
        } )
    } catch ( error ) {
        next( error )
    }
}

export const crearCliente = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const
        {
            password,
            ...body
        } = req.body as ICliente
    try {
        const passwordHash = await bcrypt.hash(
            String( password ),
            saltRounds,
        )
        const newClient    = {
            password: passwordHash,
            ...body,
        }

        const clienteExiste = await Cliente.findOne( { user: body.user } )
        if ( clienteExiste ) {
            const { user } = clienteExiste
            return res.status( 400 ).json( {
                message: `El cliente con este usuario ya existe ${user}`,
            } )
        }

        const cliente      = new Cliente( newClient )
        const clienteNuevo = await cliente.save()
        res.status( 201 ).send( {
            clienteNuevo,
            message: 'Usuario registrado',
        } )
    } catch ( error ) {
        next( error )
    }
}

export const actualizarCliente = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id }      = req.params
    const { ...body } = req.body

    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate( id, body, {
            new: true,
        } )
        clienteActualizado
            ? res.status( 201 ).send( { clienteActualizado } )
            : res.status( 400 ).send( 'No se pudo actualizar' )
    } catch ( error ) {
        next( error )
    }
}

// const borrarCliente = async (req, res = response) => {
// 	const { id } = req.params;
// 	const clienteBorrado = await Cliente.findByIdAndDelete(
// 		id,
// 		{ estado: false },
// 		{ new: true }
// 	);
// 	res.json(clienteBorrado);
// };

export const loginCliente = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { body } = req
    const { user } = body

    try {
        const clientelogeado = await Cliente.findOne( { user } )

        if ( !clientelogeado ) {
            return res.status( 400 ).send( {
                message: `El cliente con este nombre no existe ${body.user}`,
            } )
        }
        const { password }     = clientelogeado
        const passwordCorrecto = clientelogeado === null
            ? false
            : await bcrypt.compare(
                String( body.password ),
                String( password ),
            )
        if ( passwordCorrecto && clientelogeado ) {
            const token         = jwt( clientelogeado )
            const cookiesOption = {
                expires: new Date(
                    Date.now() +
                    Number( process.env.JWT_COOKIE_EXPIRE ) *
                    24 *
                    60 *
                    60 *
                    1000,
                ),
                httpOnly: true,
            }

            res.cookie( 'jwt', token, cookiesOption )
            res.cookie( 'id', clientelogeado._id, cookiesOption )
            return res.status( 201 ).send( {
                jwt    : token,
                datos  : clientelogeado,
                message: 'Cliente logeado',
            } )
        }
        res.status( 400 ).send( {
            message: 'Cliente no encontrado',
        } )
    } catch ( error ) {
        next( error )
    }
}

export const deleteCookies = ( req: Request, res: Response ) => {
    res.clearCookie( 'jwt' )
    res.clearCookie( 'id' )
    res.status( 200 ).send( { message: 'Cookies borradas' } )
}

export const obtenerCookies = ( req: Request, res: Response ) => {
    const { jwt, id } = req.cookies
    id
        ? res.status( 200 ).send( { id, jwt } )
        : res.status( 400 ).send( { message: 'No hay cookies' } )
}
