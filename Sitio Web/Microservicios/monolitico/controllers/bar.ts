import { NextFunction, Request, Response } from 'express'
import { Bar } from '../models'
import { IBar } from '../interfaces'

export const obtenerBares = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const query = { estado: true }
    try {
        const [total, bares]: [Number, IBar[]] = await Promise.all( [
            await Bar.countDocuments(
                query ),
            await Bar.find(
                query ),
        ] )

        bares === null
            ? res.status( 400 ).send( { message: 'Bares not found' } )
            : res.status( 201 ).send( {
                total,
                bares,
            } )
    } catch ( error ) {
        next( error )
    }
}

export const obtenerBarById = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params
    try {
        const bar: IBar | null = await Bar.findById( id )

        bar === null
            ? res.status( 400 ).send( { message: 'Bar not found' } )
            : res.json( { bar } )
    } catch ( error ) {
        next( error )
    }
}

export const crearBar = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { ...body } = req.body as IBar
    try {
        const barExiste = await Bar.findOne( { nombre: body.nombre } )
        if ( barExiste ) {
            const { nombre } = barExiste
            return res.status( 400 ).json( {
                message: `El bar con ese nombre ya existe ${nombre}`,
            } )
        }

        const bar      = new Bar( body )
        const barNuevo = await bar.save()
        res.status( 201 ).json( { bar: barNuevo } )
    } catch ( error ) {
        next( error )
    }
}

export const actualizarBar = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params
    try {
        const { ...data }                = req.body as IBar
        const barModificado: IBar | null = await Bar.findByIdAndUpdate(
            id,
            data,
            { new: true },
        )

        barModificado === null
            ? res.status( 400 ).send( { message: 'Bar not found' } )
            : res.status( 201 ).json( { bar: barModificado } )
    } catch ( error ) {
        next( error )
    }
}

export const borrarBar = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params
    try {
        const barBorrado: IBar | null = await Bar.findByIdAndDelete(
            id,
            { estado: false, new: true },
        )

        barBorrado === null
            ? res.status( 400 ).send( { message: 'Bar not found' } )
            : res.status( 201 ).json( { bar: barBorrado } )
    } catch ( error ) {
        next( error )
    }
}
