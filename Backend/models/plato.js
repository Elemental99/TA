const { Schema, model } = require('mongoose');

const PlatoSchema = Schema({
	nombre_plato: String,
});

module.exports = model('Plato', PlatoSchema);
