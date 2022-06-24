import { model, Schema } from 'mongoose';

const barSchema = new Schema({
    nombre        : String,
    ubicacion     : String,
    vende_desayuno: String,
    vende_almuerzo: String,
    horario       : String,
    capacidad     : Number
});

export default model('Bar', barSchema);
