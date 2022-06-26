import mongoose, { model, Schema } from 'mongoose'
import { IPlato } from '../interfaces'

const PlatoSchema: mongoose.Schema = new Schema<IPlato>({
    nombre_plato: String,
})

const Plato: mongoose.Model<IPlato> = model<IPlato>('Plato', PlatoSchema)

export default Plato
