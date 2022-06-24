import { Request, Response } from 'express';
import { IBar } from '../interfaces/IBar';
import { Bar } from '../models';

export const obtenerBares = async (req: Request, res: Response) => {
    // const {limite=10, desde=0}= req.query;
    const query = { estado: true };
    
    const [total, bares] = await Promise.all([
        await Bar.countDocuments(query),
        await Bar.find(query),
    ]);
    if ( bares ) {
        res.status(200).send({
            total,
            bares,
        });
    } else {
        res.status(200).send({
            message: 'Bares not found',
        });
    }
};

export const obtenerBar = async (req: Request, res: Response) => {
	const { id } = req.params;
	const bar = await Bar.findById(id);
	res.json(bar);
};

export const crearBar = async (req: Request, res: Response) => {
    const { ...body } = req.body;
    const barExiste = await Bar.findOne({ nombre: body.nombre });
    if ( barExiste ) {
        const { nombre } = barExiste;
        return res.status(400).json({
            message: `El bar con ese nombre ya existe ${ nombre }`,
        });
    }
    const bar      = new Bar(body);
    const barNuevo = await bar.save(); // Guardar el bar en la base de datos
    res.status(201).json({ bar: barNuevo });

};

export const actualizarBar = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { data } = req.body;
	const barModificado = await Bar.findByIdAndUpdate(id, data, { new: true });
	res.json(barModificado);
};

export const borrarBar = async (req: Request, res: Response) => {
	const { id } = req.params;
	const barBorrado = await Bar.findByIdAndUpdate(
		id,
		{ estado: false },
		{ new: true }
	);
	res.json(barBorrado);
};
