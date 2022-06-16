import { model, Schema } from 'mongoose';

const barSchema = new Schema({
    nombre        : String,
    ubicacion     : String,
    vende_desayuno: Boolean,
    vende_almuerzo: Boolean,
    horario       : String,
    capacidad     : Number
});

export default model('Bar', barSchema);
