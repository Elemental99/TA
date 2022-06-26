import { NextFunction, Request, Response } from 'express'
import { Plato } from '../models'
import { IPlato } from '../interfaces'

export const obtenerPlatos = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const query = { estado: true }
    try {
        const [total, platos]: [Number, IPlato[]] = await Promise.all([
            Plato.countDocuments(query),
            Plato.find(query),
        ])
        if ( platos.length === 0 ) {
            return res.status(400).json({
                    message: 'No hay platos',
                },
            )
        } else {
            return res.status(201).json({
                total,
                platos,
            })
        }
    } catch (error) {
        next(error)
    }
}

// const obtenerPlato = async (req,res= response) =>{
//     const {id} = req.params;
//     const plato = await  Plato.findById(id);
//     res.json(plato);
// }

export const crearPlato = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { ...body }      = req.body as IPlato
    const { nombre_plato } = body
    try {
        const platoExiste = await Plato.findOne({ nombre: nombre_plato })
        if ( platoExiste ) {
            res.status(400).json({
                message:
                    `El plato que desea crear ya existe ${nombre_plato}`,
            })
        }
        const plato      = new Plato(body)
        const platoNuevo = await plato.save()
        res.status(201).json(platoNuevo)
    } catch (error) {
        next(error)
    }
}

// const actualizarPlato = async (req, res = response) => {
// 	const { id } = req.params;
// 	const { body } = req.body;

// 	const platoActualizado = await Plato.findByIdAndUpdate(id, body, {
// 		new: true,
// 	});
// 	res.json(platoActualizado);
// };

// const borrarPlato= async(req, res = response)=>{
//     const {id} = req.params
//     const platoBorrado= await Plato.findByIdAndUpdate(id,{estado:false}, {new:true});
//     res.json(platoBorrado);
// }
