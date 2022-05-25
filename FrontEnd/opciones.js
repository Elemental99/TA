require('colors');
const inquirer = require('inquirer');
const axios = require('axios');
const { url, paths } = require('./Rutas/rutas');
const { pausa } = require('./Rutas/pausa');
const { login, registrarse, reservacioncrear } = require('./Public/inputs');
const { menuOp, menuOp2, menuOp3 } = require('./Public/menuOpcion');

const menu_principal = async () => {
	let opt = '';
	do {
		opt = await menuOp();
		switch (opt) {
			case '1':
				return logear();
			case '2':
				return register();
			case '0':
				process.exit(0);
			default:
				break;
		}
	} while (opt !== '0');
};
const logear = async () => {
	console.clear();
	console.log('');
	const answers = await inquirer.prompt(login);
	const user = answers['user: '];
	const password = answers['password: '];

	try {
		const obtenerDatos = await axios.get(`${url}${paths.cliente}`, {
			params: {
				user,
				password,
			},
		});
		console.log(obtenerDatos.data.message);
		if (obtenerDatos.data.message == 'Cliente logeado') {
			id = obtenerDatos.data.datos._id;
			await menu_principal2(id);
		} else {
			await pausa();
			await menu_principal();
		}
	} catch (error) {
		console.log(error);
		await pausa();
		await menu_principal();
	}
};

const register = async () => {
	console.clear();
	console.log('');
	const answers = await inquirer.prompt(registrarse);

	try {
		const registro = await axios.post(`${url}${paths.cliente}`, {
			nombre_cliente: answers['nombre: '],
			cedula: answers['cedula: '],
			edad: answers['edad: '],
			telefono: answers['telefono: '],
			facultad: answers['facultad: '],
			user: answers['user: '],
			password: answers['password: '],
		});
		console.log(registro.data.message);
		await pausa();
		await menu_principal();
	} catch (error) {
		console.log(error);
		await pausa();
		await menu_principal();
	}
};

module.exports = {
	menu_principal,
};
