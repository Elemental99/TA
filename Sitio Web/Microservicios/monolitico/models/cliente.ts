import mongoose, { model, Schema } from 'mongoose'
import { ICliente } from '../interfaces'

const ClienteSchema: mongoose.Schema = new Schema<ICliente>( {
    nombre_cliente: String,
    cedula        : String,
    edad          : Number,
    telefono      : Number,
    facultad      : String,
    user          : String,
    password      : String,
} )

const Cliente: mongoose.Model<ICliente> = model<ICliente>(
    'Cliente',
    ClienteSchema,
)

export default Cliente
