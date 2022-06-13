import mongoose, { model, Schema } from 'mongoose';

const ReservacionSchema = new Schema({
    idcliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    idmenu: { type: mongoose.Types.ObjectId, ref: 'Menu' },
    fecha: Date,
    hora: String,
    descripcion: String
});

export default model('Reservacion', ReservacionSchema);
