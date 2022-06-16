import { model, Schema } from 'mongoose';

const PlatoSchema = new Schema({
    nombre_plato: String
});

export default model('Plato', PlatoSchema);
