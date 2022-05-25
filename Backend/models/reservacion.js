const { Schema, model, mongoose } = require('mongoose');

const ReservacionSchema = Schema({
	idcliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
	idmenu: { type: mongoose.Types.ObjectId, ref: 'Menu' },
	fecha: Date,
	hora: String,
	descripcion: String,
});

module.exports = model('Reservacion', ReservacionSchema);
