const { response } = require('express');
const { Cliente } = require('../models');
const jwt = require('../helpers/jwt');

// const obtenerClientes = async (req, res = response) => {
// 	// const { limite = 10, desde = 0 } = req.query;

// 	const [clientes] = await Promise.all([Cliente.find()]);

// 	res.send({
// 		clientes,
// 	});
// };

// const obtenerCliente = async (req, res = response) => {
// 	const { id } = req.params;
// 	const cliente = await Cliente.findById(id);
// 	res.send({
// 		cliente,
// 	});
// };

const crearCliente = async (req, res = response) => {
	const body = req.body;

	const clienteExiste = await Cliente.findOne({ user: body.user });
	if (clienteExiste) {
		res.status(200).json({
			message: `El cliente con este usuario ya existe ${clienteExiste.user}`,
		});
	}

	const cliente = new Cliente(body);
	await cliente.save();
	res.status(200).send({
		message: 'Usuario registrado',
	});
};

// const actualizarCliente = async (req, res = response) => {
// 	const { id } = req.params;
// 	const { body } = req.body;

// 	const clienteActualizado = await Cliente.findByIdAndUpdate(id, body, {
// 		new: true,
// 	});
// 	res.json(clienteActualizado);
// };

// const borrarCliente = async (req, res = response) => {
// 	const { id } = req.params;
// 	const clienteBorrado = await Cliente.findByIdAndDelete(
// 		id,
// 		{ estado: false },
// 		{ new: true }
// 	);
// 	res.json(clienteBorrado);
// };

const loginCliente = async (req, res) => {
	const body = req.query;
	const clientelogeado = await Cliente.findOne({ user: body.user });

	if (clientelogeado) {
		if (
			body.user == clientelogeado.user &&
			body.password == clientelogeado.password
		) {
			res.status(200).send({
				jwt: jwt.createToken(clientelogeado),
				message: 'Cliente logeado',
				datos: clientelogeado,
			});
		} else {
			res.status(200).send({
				message: `Cliente no encontrado`,
			});
		}
	} else {
		res.status(200).send({
			message: `El cliente con este nombre ya existe ${body.user}`,
		});
	}
};

module.exports = {
	crearCliente,
	// obtenerCliente,
	// obtenerClientes,
	// actualizarCliente,
	// borrarCliente,
	loginCliente,
};
