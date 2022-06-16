import { model, Schema } from 'mongoose';

const ClienteSchema = new Schema({
	nombre_cliente: String,
	cedula: String,
	edad: Number,
	telefono: Number,
	facultad: String,
	user: String,
	password: String,
});

export default model('Cliente', ClienteSchema);
