const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
	nombre_cliente: { type: String, required: true },
	cedula: { type: String, unique: true, required: true },
	edad: { type: Number, required: true },
	telefono: { type: Number, required: true },
	facultad: { type: String, required: true },
	user: { type: String, unique: true },
	password: { type: String, required: true },
});

module.exports = model('Cliente', ClienteSchema);
