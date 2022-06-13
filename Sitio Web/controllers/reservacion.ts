import { Request, Response } from 'express';
import { Reservacion } from '../models';

export const obtenerReservaciones = async (req: Request, res: Response) => {
	// const { limite = 10, desde = 0 } = req.query;
	const query = { estado: true };

	const [reservaciones] = await Promise.all([Reservacion.find(query)]);

	res.status(200).send({
		reservaciones,
	});
};

export const obtenerReservacion = async (req: Request, res: Response) => {
	const { id } = req.params;
	const reservacion = await Reservacion.find({ idcliente: id });
	if (reservacion) {
		res.status(200).send({
			reservacion,
		});
	} else {
		res.status(200).send({
			message: 'No hay reservaciones',
		});
	}
};

// const obtenerReservacionbyId = async (req, res = response) => {
// 	const { id } = req.params;
// 	const reservacion = await Reservacion.findById(id);
// 	if (reservacion) {
// 		res.status(200).send({
// 			reservacion,
// 		});
// 	} else {
// 		res.status(200).send({
// 			message: 'No hay reservaciones',
// 		});
// 	}
// };

export const crearReservacion = async (req: Request, res: Response) => {
	const { ...body } = req.body;

	const reservacion = new Reservacion(body);
	await reservacion.save();
	res.status(200).send({
		message: 'Reservacion creada exitosamente',
		data: reservacion,
	});
};

export const actualizarReservacion = async (req: Request, res: Response) => {
	const { id } = req.params;
	const body = req.body;

	const reservacionActualizado = await Reservacion.findByIdAndUpdate(
		id,
		body,
		{
			new: true,
		}
	);
	res.json(reservacionActualizado);
};

export const borrarReservacion = async (req: Request, res: Response) => {
	const { id } = req.params;
	const reservacionBorrado = await Reservacion.findByIdAndDelete(id, {
		new: true,
	});
	if (reservacionBorrado) {
		res.status(200).send({
			reservacionBorrado,
			message: 'Reservacion eliminada exitosamente',
		});
	} else {
		res.status(200).send({
			message: `La reservacion con id ${id} no esta en la base de datos`,
		});
	}
};
