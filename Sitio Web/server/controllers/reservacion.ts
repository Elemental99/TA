import { NextFunction, Request, Response } from 'express'
import { Reservacion } from '../models'
import { IReservacion } from '../interfaces'

export const obtenerReservaciones = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const query = { estado: true }
    
    try {
        const [total, reservaciones]: [Number, IReservacion[]] = await Promise.all(
            [
                Reservacion.countDocuments(query),
                Reservacion.find(query),
            ])
        if ( reservaciones.length === 0 ) {
            return res.status(400).json({
                message: 'No hay reservaciones',
            })
        }
        res.status(201).send({
            total,
            reservaciones,
        })
    } catch (error) {
        next(error)
    }
    
}

export const obtenerReservacion = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params
    try {
        const reservacion = await Reservacion.find({ idcliente: id })
        if ( reservacion.length === 0 ) {
            return res.status(400).send({
                message: 'No hay reservaciones',
            })
        }
        return res.status(201).send({
            reservacion,
        })
    } catch (error) {
        next(error)
    }
}

export const obtenerReservacionbyId = async (
    req: Request,
    res: Response,
    next: NextFunction,
    ) => {
	const { id } = req.params;
    try {
        const reservacion = await Reservacion.findById(id);
        if (reservacion) {
            res.status(200).send({
                reservacion,
            });
        } else {
            res.status(200).send({
                message: 'No hay reservaciones',
            });
	    }    
    } catch (error) {
        next(error)    
    }
	
};

export const crearReservacion = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { ...body } = req.body as IReservacion
    try {
        const reservacion      = new Reservacion(body)
        const reservacionNueva = await reservacion.save()
        res.status(201).send({
            message: 'Reservacion creada exitosamente',
            data   : reservacionNueva,
        })
    } catch (error) {
        next(error)
    }
}

export const actualizarReservacion = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params
    const body   = req.body as IReservacion
    try {
        const reservacionActualizado: IReservacion | null = await Reservacion.findByIdAndUpdate(
            id,
            body,
            {
                new: true,
            },
        )
        if ( !reservacionActualizado ) {
            return res.status(400).send({
                message: 'No se pudo actualizar la reservacion',
            })
        }
        res.status(201).send({
            message: 'Reservacion actualizada exitosamente',
        })
    } catch (error) {
        next(error)
    }
}

export const borrarReservacion = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params
    try {
        const reservacionBorrado: IReservacion | null = await Reservacion.findByIdAndDelete(
            id,
            {
                new: true,
            },
        )
        if ( reservacionBorrado ) {
            res.status(201).send({
                reservacionBorrado,
                message: 'Reservacion eliminada exitosamente',
            })
        } else {
            res.status(400).send({
                message: `La reservacion con id ${id} no esta en la base de datos`,
            })
        }
    } catch (error) {
        next(error)
    }
}
