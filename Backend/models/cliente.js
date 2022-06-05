const { Schema, model } = require('mongoose');

const ClienteSchema = new Schema({
    nombre_cliente: String,
    cedula: String,
    edad: Number,
    telefono: Number,
    facultad: String,
    user: String,
    password: String
});

module.exports = model('Cliente', ClienteSchema);
