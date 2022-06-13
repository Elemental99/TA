const { Schema, model } = require('mongoose');

const PlatoSchema = new Schema({
    nombre_plato: String
});

module.exports = model('Plato', PlatoSchema);
