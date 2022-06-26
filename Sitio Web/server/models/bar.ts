import mongoose, { model, Schema } from 'mongoose'
import { IBar } from '../interfaces'

const barSchema: mongoose.Schema = new Schema<IBar>({
    nombre        : String,
    ubicacion     : String,
    vende_desayuno: Boolean,
    vende_almuerzo: Boolean,
    horario       : String,
    capacidad     : Number,
})

const Bar: mongoose.Model<IBar> = model<IBar>('Bar', barSchema)

export default Bar
