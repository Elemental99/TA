const login = [
    {
        type: 'input',
        message: 'Ingrese su usuario: '.green,
        name: 'user: '
    },
    {
        type: 'input',
        message: 'Ingrese su contraseña: '.green,
        name: 'password: '
    }
];

const registrarse = [
    {
        type: 'input',
        message: 'Ingrese su nombre: '.green,
        name: 'nombre: '
    },
    {
        type: 'input',
        message: 'Ingrese su cedula: '.green,
        name: 'cedula: '
    },
    {
        type: 'input',
        message: 'Ingrese su edad: '.green,
        name: 'edad: '
    },
    {
        type: 'input',
        message: 'Ingrese su telefono: '.green,
        name: 'telefono: '
    },
    {
        type: 'input',
        message: 'Ingrese su facultad: '.green,
        name: 'facultad: '
    },
    {
        type: 'input',
        message: 'Ingrese su usuario: '.green,
        name: 'user: '
    },
    {
        type: 'input',
        message: 'Ingrese su contraseña: '.green,
        name: 'password: '
    }
];

const reservacioncrear = [
    {
        type: 'input',
        message: 'Ingrese la fecha: '.green,
        name: 'fecha: '
    },
    {
        type: 'input',
        message: 'Ingrese la hora: '.green,
        name: 'hora: '
    },
    {
        type: 'input',
        message: 'Ingrese la descripcion: '.green,
        name: 'descripcion: '
    }
];

module.exports = {
    login,
    registrarse,
    reservacioncrear
};
