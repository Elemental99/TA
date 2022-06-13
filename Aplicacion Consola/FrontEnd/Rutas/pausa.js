const inquirer = require('inquirer');

const pausa = async () => {
	const question = [
		{
			type: 'input',
			name: 'enter',
			message: `Presion ${'enter'.blue} para continuar`,
		},
	];
	await inquirer.prompt(question);
};

module.exports = {
	pausa,
};
