const { response } = require('express');
const { Bar } = require('../models');

const obtenerBares = async (req, res = response) => {
	// const {limite=10, desde=0}= req.query;
	const query = { estado: true };

	const [total, bares] = await Promise.all([
		await Bar.countDocuments(query),
		await Bar.find(query),
	]);
	if (bares) {
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

// const obtenerBar = async (req, res = response) => {
// 	const { id } = req.params;
// 	const bar = await Bar.findById(id);
// 	res.json(bar);
// };

// const crearBar = async (req, res = response) => {
// 	const { body } = req.body;
// 	const barExiste = Bar.findOne({ nombre: body.nombre });
// 	if (barExiste) {
// 		res.status(400).json({
// 			message: `El bar con ese nombre ya existe ${barExiste.nombre}`,
// 		});
// 	}
// 	const bar = new Bar(body);
// 	const barNuevo = await bar.save();
// 	res.status(201).json(barNuevo);
// };

// const actualizarBar = async (req, res = response) => {
// 	const { id } = req.params;
// 	const { data } = req.body;
// 	const barModificado = await Bar.findByIdAndUpdate(id, data, { new: true });
// 	res.json(barModificado);
// };

// const borrarBar = async (req, res = response) => {
// 	const { id } = req.params;
// 	const barBorrado = await Bar.findByIdAndUpdate(
// 		id,
// 		{ estado: false },
// 		{ new: true }
// 	);
// 	res.json(barBorrado);
// };

module.exports = {
	obtenerBares,
	// obtenerBar,
	// crearBar,
	// actualizarBar,
	// borrarBar,
};
