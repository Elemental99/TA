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

const menu_principal2 = async (id) => {
	let opt = '';
	do {
		opt = await menuOp2();
		switch (opt) {
			case '1':
				return verBares(id);
			case '2':
				return verMenus(id);
			case '3':
				return await menu_principal3(id);
			case '0':
				return await menu_principal();
			default:
				break;
		}
	} while (opt !== '0');
};

const menu_principal3 = async (id) => {
	let opt = '';
	do {
		opt = await menuOp3();
		switch (opt) {
			case '1':
				return await CreacionReservacion(id);
			case '2':
				return await BuscarReservacion(id);
			case '3':
				return await EliminarReservacion(id);
			case '0':
				return await menu_principal2(id);
			default:
				break;
		}
	} while (opt !== '0');
};

const submenu = async (menu, datos) => {
	a = '';
	do {
		switch (menu) {
			case 1:
				return (a = datos[0]._id);
			case 2:
				return (a = datos[1]._id);
			case 3:
				return (a = datos[2]._id);
			case 4:
				return (a = datos[3]._id);
			case 5:
				return (a = datos[4]._id);
			case 6:
				return (a = datos[5]._id);
			case 7:
				return (a = datos[6]._id);
			case 8:
				return (a = datos[7]._id);
			case 9:
				return (a = datos[8]._id);
			case 10:
				return (a = datos[9]._id);
			default:
				break;
		}
	} while (menu > 5);
};

const submenu2 = async (buscarReservacion, datos) => {
	var a = 0;
	do {
		switch (buscarReservacion) {
			case 1:
				return (a = datos[0]._id);
			case 2:
				return (a = datos[1]._id);
			default:
				break;
		}
	} while (buscarReservacion > 2);
};

const menuRawlist = async (datos) => {
	c = 0;
	const menu = [
		{
			type: 'rawlist',
			name: 'menu',
			message: 'Escoja el menu: '.green,
			choices: datos.map((item, c) => ({
				value: c + 1,
				name: item._id,
			})),
		},
	];
	return menu;
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

const verBares = async (id) => {
	console.clear();
	console.log('');
	try {
		const obtenerBar = await axios.get(`${url}${paths.bar}`);
		// console.log(datos._id);
		console.table(obtenerBar.data.bares, [
			'nombre',
			'ubicacion',
			'vende_desayuno',
			'vende_almuerzo',
			'horario',
			'capacidad',
		]);
		await pausa();
		await menu_principal2(id);
	} catch (error) {
		console.log(error.message);
		await pausa();
		await menu_principal2(id);
	}
};

const CreacionReservacion = async (id) => {
	console.clear();
	console.log('');
	try {
		const verMenus = await axios.get(`${url}${paths.menu}`);
		const datos = verMenus.data.menus;
		const obtener = await menuRawlist(datos);
		const { menu } = await inquirer.prompt(obtener);

		a = await submenu(menu, datos);
		const answers = await inquirer.prompt(reservacioncrear);

		const crearReservacion = await axios.post(
			`${url}${paths.reservacion}`,
			{
				idcliente: id,
				idmenu: a,
				fecha: answers['fecha: '],
				hora: answers['hora: '],
				descripcion: answers['descripcion: '],
			}
		);
		console.log(crearReservacion.data.message);
		await pausa();
		await menu_principal3(id);
	} catch (error) {
		console.log(error);
		await pausa();
		await menu_principal2(id);
	}
};

const BuscarReservacion = async (id) => {
	console.clear();
	console.log('');
	try {
		const buscarReservacion = await axios.get(
			`${url}${paths.reservacion}` + id
		);
		if (buscarReservacion) {
			console.table(buscarReservacion.data.reservacion, [
				'fecha',
				'hora',
				'descripcion',
			]);
		} else {
			console.log(buscarReservacion.data.message);
		}
		await pausa();
		await menu_principal3(id);
	} catch (error) {
		console.log(error);
		await pausa();
		await menu_principal2(id);
	}
};

const EliminarReservacion = async (id) => {
	console.clear();
	console.log('');
	try {
		const buscar = await axios.get(`${url}${paths.reservacion}` + id);
		const datos = buscar.data.reservacion;
		// console.log(datos);

		const { buscarReservacion } = await inquirer.prompt({
			type: 'rawlist',
			name: 'buscarReservacion',
			message: 'Escoja la reservacion a eliminar: '.green,
			choices: datos.map((item, c) => ({
				value: c + 1,
				name: item._id,
			})),
		});

		a = await submenu2(buscarReservacion, datos);

		const eliminarReservacion = await axios.delete(
			`${url}${paths.reservacion}` + a
		);

		if (eliminarReservacion) {
			console.log(eliminarReservacion.data);
			await pausa();
			await menu_principal3(id);
		} else {
			console.log(eliminarReservacion.data.message);
			await pausa();
			await menu_principal3(id);
		}
	} catch (error) {
		console.log(error);
		await pausa();
		await menu_principal2(id);
	}
};

const verMenus = async (id) => {
	console.clear();
	console.log('');
	try {
		const obtenerPlato = await axios.get(`${url}${paths.plato}`);
		const mostrarPlato = obtenerPlato.data.platos;
		console.log('================= PLATOS =====================');
		console.table(mostrarPlato, ['nombre_plato']);
		await pausa();
		await menu_principal2(id);
	} catch (error) {
		console.log(error.message);
		await pausa();
		await menu_principal2(id);
	}
};

module.exports = {
	menu_principal,
};
