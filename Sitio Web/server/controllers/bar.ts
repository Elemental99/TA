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
        const [total, bares]: [Number, IBar[]] = await Promise.all([
            await Bar.countDocuments(
                query),
            await Bar.find(
                query),
        ])
        if (bares) {
            res.status(201).send({
                total,
                bares,
            })
        } else {
            res.status(400).send({
                message: 'Bares not found',
            })
        }
    } catch (error) {
        next(error)
    }
}

export const obtenerBarById = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params
    try {
        const bar: IBar | null = await Bar.findById(id)
        if (bar) {
            res.json({ bar })
        } else {
            res.status(400).send({
                message: 'Bar not found',
            })
        }
    } catch (error) {
        next(error)
    }
}

export const crearBar = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { ...body } = req.body as IBar
    try {
        const barExiste = await Bar.findOne({ nombre: body.nombre })
        if (barExiste) {
            const { nombre } = barExiste
            res.status(400).json({
                message: `El bar con ese nombre ya existe ${nombre}`,
            })
        }
        const bar = new Bar(body)
        const barNuevo = await bar.save()
        res.status(201).json({ bar: barNuevo })
    } catch (error) {
        next(error)
    }
}

// const actualizarBar = async(req: Request, res: Response) => {
//     const { id }        = req.params
//     const { ...data }   = req.body as IBar
//     const barModificado: IBar | null = await Bar.findByIdAndUpdate(id, data, { new: true })
//     res.status(201).json(barModificado)
// }

// const borrarBar = async(req: Request, res: Response) => {
//     const { id }                  = req.params
//     const barBorrado: IBar | null = await Bar.findByIdAndUpdate(
//         id,
//         { estado: false },
//         { new: true },
//     )
//     res.status(201).json(barBorrado)
// }
