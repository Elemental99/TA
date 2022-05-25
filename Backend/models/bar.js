const { Schema, model } = require('mongoose');

const barSchema = Schema({
	nombre: String,
	ubicacion: String,
	vende_desayuno: Boolean,
	vende_almuerzo: Boolean,
	horario: String,
	capacidad: Number,
});

module.exports = model('Bar', barSchema);
