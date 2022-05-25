const { response } = require('express');
const { Reservacion } = require('../models');

// const obtenerReservaciones = async (req, res = response) => {
// 	// const { limite = 10, desde = 0 } = req.query;
// 	const query = { estado: true };

// 	const [reservaciones] = await Promise.all([Reservacion.find(query)]);

// 	res.status(200).send({
// 		reservaciones,
// 	});
// };

const obtenerReservacion = async (req, res = response) => {
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

const crearReservacion = async (req, res = response) => {
	const body = req.body;

	const reservacion = new Reservacion(body);
	await reservacion.save();
	res.status(200).send({
		message: 'Reservacion creada exitosamente',
		data: reservacion,
	});
};

const actualizarReservacion = async (req, res = response) => {
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

const borrarReservacion = async (req, res = response) => {
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

module.exports = {
	crearReservacion,
	obtenerReservacion,
	actualizarReservacion,
	borrarReservacion,
	// obtenerReservaciones,
	// obtenerReservacionbyId,
};
