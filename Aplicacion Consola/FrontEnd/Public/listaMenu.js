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

const ElegirReservacion = async (datos) => {
    return {
        type: 'rawlist',
        name: 'buscarReservacion',
        message: 'Escoja la reservacion a eliminar: '.green,
        choices: datos.map((item, c) => ({
            value: c + 1,
            name: item['_id']
        }))
    };
};

const menuRawlist = async (datos) => {
    return [
        {
            type: 'rawlist',
            name: 'menu',
            message: 'Escoja el menu: '.green,
            choices: datos.map((item, c) => ({
                value: c + 1,
                name: item['_id']
            }))
        }
    ];
};

module.exports = {
    submenu,
    submenu2,
    ElegirReservacion,
    menuRawlist
};
