function validacionLogin(answers) {
	let c = 0;
	const user = answers['user: '];
	const password = answers['password: '];

	if (user == null || user.length === 0 || /^\s+$/.test(user)) {
		console.log('Ingrese su Usuario Por Favor');
		c = 1;
	}

	if (password == null || password.length === 0 || /^\s+$/.test(password)) {
		console.log('Ingrese la contraseña Por Favor');
		c = 1;
	}
	return c;
}

function validacionRegister(answers) {
	let c = 0;
	const nombre = answers['nombre: '];
	const cedula = answers['cedula: '];
	const edad = answers['edad: '];
	const telefono = answers['telefono: '];
	const facultad = answers['facultad: '];
	const user = answers['user: '];
	const password = answers['password: '];

	if (nombre == null || nombre.length <= 5 || /^\s+$/.test(nombre)) {
		console.log('Tiene que escribir su nombre y apellido completo');
		c = 1;
	}

	if (cedula == null || cedula.length < 10 || /^\s+$/.test(cedula)) {
		console.log('Escriba su numero de cedula Por Favor');
		c = 1;
	} else {
		if (isNaN(cedula) || cedula.length > 10) {
			console.log('Escriba correctamente su cedula');
			c = 1;
		}
	}

	if (edad == null || edad.length === 0 || /^\s+$/.test(edad)) {
		console.log('Escriba su edad Por Favor');
		c = 1;
	} else {
		if (isNaN(edad) || edad.length > 2) {
			console.log('Escriba correctamente su edad');
			c = 1;
		}
	}

	if (telefono == null || telefono.length < 10 || /^\s+$/.test(telefono)) {
		console.log('Escriba su numero de telefono Por Favor');
		c = 1;
	} else {
		if (isNaN(telefono) || telefono.length > 10) {
			console.log('Escriba correctamente su telefono');
			c = 1;
		}
	}

	if (facultad == null || facultad.length === 0 || /^\s+$/.test(facultad)) {
		console.log('Ingrese su facultad Por Favor');
		c = 1;
	}

	if (user == null || user.length === 0 || /^\s+$/.test(user)) {
		console.log('Ingrese su Usuario Por Favor');
		c = 1;
	} else {
		if (user.length <= 4) {
			console.log('Su usuario debe tener mas de 4 caracteres');
			c = 1;
		}
	}

	if (password == null || password.length === 0 || /^\s+$/.test(password)) {
		console.log('Ingrese la contraseña Por Favor');
		c = 1;
	} else {
		if (password.length <= 4) {
			console.log('Su contraseña debe tener mas de 4 caracteres');
			c = 1;
		}
	}
	return c;
}

module.exports = {
	validacionLogin,
	validacionRegister,
};
