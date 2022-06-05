require('colors');
const inquirer = require('inquirer');
const axios = require('axios');
const { url, paths } = require('./Rutas/rutas');
const { pausa } = require('./Rutas/pausa');
const { login, registrarse, reservacioncrear, ElegirReservacion, menuRawlist } = require('./Public/inputs');
const { menuOp, menuOp2, menuOp3 } = require('./Public/menuOpcion');
const {
    validacionLogin,
    validacionRegister
} = require('./middlewares/validacion');

const menu_principal = async () => {
    let opt = '';
    do {
        opt = await menuOp();
        switch ( opt ) {
            case '1':
                return logear();
            case '2':
                return register();
            case '0':
                process.exit(0);
        }
    } while ( opt !== '0' );
};

const menu_principal2 = async (id) => {
    let opt = '';
    do {
        opt = await menuOp2();
        switch ( opt ) {
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
    } while ( opt !== '0' );
};

const menu_principal3 = async (id) => {
    let opt = '';
    do {
        opt = await menuOp3();
        switch ( opt ) {
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
    } while ( opt !== '0' );
};

const submenu = async (menu, datos) => {
    let a = 0;
    datos.map((item, c) => {
        c += 1;
        if ( c === menu ) {
            a = item['_id'];
        }
    });
    return a;
};

const submenu2 = async (buscarReservacion, datos) => {
    let a = 0;
    datos.map((item, c) => {
        c += 1;
        if ( c === buscarReservacion ) {
            a = item['_id'];
        }
    });
    return a;
};


const logear = async () => {
    console.clear();
    console.log('');
    const answers = await inquirer.prompt(login);
    const user = answers['user: '];
    const password = answers['password: '];
    const c = validacionLogin(answers);

    try {
        if ( c !== 1 ) {
            const obtenerDatos = await axios.get(`${ url }${ paths.cliente }`, {
                params: {
                    user,
                    password
                }
            });
            console.log(obtenerDatos.data.message);
            if ( obtenerDatos.data.message === 'Cliente logeado' ) {
                const id = obtenerDatos.data.datos['_id'];
                await menu_principal2(id);
            }
        }

        await pausa();
        await menu_principal();
    } catch (error) {
        console.error(error);
    }
};

const register = async () => {
    console.clear();
    console.log('');
    const answers = await inquirer.prompt(registrarse);
    const c = validacionRegister(answers);

    try {
        if ( c !== 1 ) {
            const registro = await axios.post(`${ url }${ paths.cliente }`, {
                nombre_cliente: answers['nombre: '],
                cedula: answers['cedula: '],
                edad: answers['edad: '],
                telefono: answers['telefono: '],
                facultad: answers['facultad: '],
                user: answers['user: '],
                password: answers['password: ']
            });
            console.log(registro.data.message);
        }

        await pausa();
        await menu_principal();
    } catch (error) {
        console.error(error);
    }
};

const verBares = async (id) => {
    console.clear();
    console.log('');
    try {
        const obtenerBar = await axios.get(`${ url }${ paths.bar }`);
        // console.log(datos._id);
        if ( obtenerBar ) {
            console.table(obtenerBar.data.bares, [
                'nombre',
                'ubicacion',
                'vende_desayuno',
                'vende_almuerzo',
                'horario',
                'capacidad'
            ]);
        } else {
            console.log(obtenerBar.data.message);
        }
        await pausa();
        await menu_principal2(id);
    } catch (error) {
        console.error(error);
    }
};

const CreacionReservacion = async (id) => {
    console.clear();
    console.log('');
    try {
        const verMenus = await axios.get(`${ url }${ paths.menu }`);
        const datos = verMenus.data.menus;
        const obtener = await menuRawlist(datos);
        const { menu } = await inquirer.prompt(obtener);

        const EscojerIdMenu = await submenu(menu, datos);
        const answers = await inquirer.prompt(reservacioncrear);

        const crearReservacion = await axios.post(
            `${ url }${ paths.reservacion }`,
            {
                idcliente: id,
                idmenu: EscojerIdMenu,
                fecha: answers['fecha: '],
                hora: answers['hora: '],
                descripcion: answers['descripcion: ']
            }
        );
        console.log(crearReservacion.data.message);
        await pausa();
        await menu_principal3(id);
    } catch (error) {
        console.error(error);
    }
};

const BuscarReservacion = async (id) => {
    console.clear();
    console.log('');
    try {
        const buscarReservacion = await axios.get(
            `${ url }${ paths.reservacion }` + id
        );
        if ( buscarReservacion.data.c === 1 ) {
            console.table(buscarReservacion.data.reservacion, [
                'fecha',
                'hora',
                'descripcion'
            ]);
        } else {
            console.log(buscarReservacion.data.message);
        }
        await pausa();
        await menu_principal3(id);
    } catch (error) {
        console.error(error);
    }
};

const EliminarReservacion = async (id) => {
    console.clear();
    console.log('');

    try {
        const buscar = await axios.get(`${ url }${ paths.reservacion }` + id);
        const datos = buscar.data.reservacion;

        if ( datos.length === 0 ) {
            console.log('No hay reservaciones');
            await pausa();
            await menu_principal3(id);
        }

        const obtener = await ElegirReservacion(datos);
        const { buscarReservacion } = await inquirer.prompt(obtener);
        const buscarReservaciones = await submenu2(buscarReservacion, datos);

        const eliminarReservacion = await axios.delete(
            `${ url }${ paths.reservacion }` + buscarReservaciones
        );


        console.log(eliminarReservacion.data);
        await pausa();
        await menu_principal3(id);

    } catch (error) {
        console.error(error);
    }
};

const verMenus = async (id) => {
    console.clear();
    console.log('');
    try {
        const obtenerPlato = await axios.get(`${ url }${ paths.plato }`);
        const mostrarPlato = obtenerPlato.data.platos;
        if ( mostrarPlato ) {
            console.log('================= PLATOS =====================');
            console.table(mostrarPlato, ['nombre_plato']);
        } else {
            console.log(mostrarPlato.data.message);
        }
        await pausa();
        await menu_principal2(id);
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    menu_principal
};
