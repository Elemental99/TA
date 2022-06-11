const menu = [
	{
		type: 'list',
		name: 'opciones',
		message: '¿Qué deseas hacer?',
		choices: [
			{
				value: '1',
				name: `1 Iniciar sesión`,
			},
			{
				value: '2',
				name: `2 Registrarse`,
			},
			{
				value: '0',
				name: `0 Salir`,
			},
		],
	},
];

const menu2 = [
	{
		type: 'list',
		name: 'logeado',
		message: 'Escoja una opcion',
		choices: [
			{
				value: '1',
				name: `1 Ver Bares`,
			},
			{
				value: '2',
				name: `2 Ver Menu`,
			},
			{
				value: '3',
				name: `3 Realizar Reservacion`,
			},
			{
				value: '0',
				name: `0 Cerrar Sesion`,
			},
		],
	},
];

const menu3 = [
	{
		type: 'list',
		name: 'reservacion',
		message: 'Escoja una opcion',
		choices: [
			{
				value: '1',
				name: `1 Crear Reservacion`,
			},
			{
				value: '2',
				name: `2 Ver Reservaciones`,
			},
			{
				value: '3',
				name: `3 Eliminar Reservacion`,
			},
			{
				value: '0',
				name: `0 Volver`,
			},
		],
	},
];

module.exports = {
	menu,
	menu2,
	menu3,
};
