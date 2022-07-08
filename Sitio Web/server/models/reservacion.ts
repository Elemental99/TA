import mongoose, { model, Schema } from 'mongoose'
import { IReservacion } from '../interfaces'

const ReservacionSchema: mongoose.Schema = new Schema<IReservacion>( {
    idcliente: {
        type: Schema.Types.ObjectId,
        ref : 'Cliente',
    },
    idmenu: {
        type: Schema.Types.ObjectId,
        ref : 'Menu',
    },
    fecha      : Date,
    hora       : String,
    descripcion: String,
} )

const Reservacion: mongoose.Model<IReservacion> = model<IReservacion>(
    'Reservacion',
    ReservacionSchema,
)

export default Reservacion
