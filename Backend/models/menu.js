const { Schema, model } = require('mongoose');

const MenuSchema = Schema({
	idbar: { type: Schema.Types.ObjectId, ref: 'Bar' },
	idplato: { type: Schema.Types.ObjectId, ref: 'Plato' },
	precio: Number,
});

module.exports = model('Menu', MenuSchema);