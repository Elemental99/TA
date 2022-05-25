require('colors');
const inquirer = require('inquirer');
const { menu, menu2, menu3 } = require('./menulist');

const menuOp = async () => {
	console.clear();
	console.log(`${'========================================'.green}`);
	console.log(`${'            BARES'.green} ${'ULEAM'.red}`);
	console.log(`${'========================================'.green}`);

	const { opciones } = await inquirer.prompt(menu);

	return opciones;
};

const menuOp2 = async () => {
	console.clear();
	console.log(`${'========================================'.green}`);
	console.log(`${'            BARES'.green} ${'ULEAM'.red}`);
	console.log(`${'========================================'.green}`);

	const { logeado } = await inquirer.prompt(menu2);

	return logeado;
};

const menuOp3 = async () => {
	console.clear();
	console.log(`${'========================================'.green}`);
	console.log(`${'            BARES'.green} ${'ULEAM'.red}`);
	console.log(`${'========================================'.green}`);

	const { reservacion } = await inquirer.prompt(menu3);

	return reservacion;
};

module.exports = {
	menuOp,
	menuOp2,
	menuOp3,
};
