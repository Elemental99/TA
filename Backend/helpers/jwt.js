const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'TA_6A';

exports.createToken = function (cliente) {
	const payload = {
		sub: cliente._id,
		nombre_cliente: String,
		cedula: String,
		edad: Number,
		telefono: Number,
		facultad: String,
		user: String,
		password: String,
		iat: moment().unix,
		exp: moment().add(30, 'days').unix(),
	};

	return jwt.encode(payload, secret);
};
