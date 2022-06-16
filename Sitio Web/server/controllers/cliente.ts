import { Response, Request } from 'express';
import { Cliente } from '../models';
import { createToken as jwt } from '../helpers/jwt';

export const obtenerClientes = async (req: Request, res: Response) => {
    // const { limite = 10, desde = 0 } = req.query;
    
    const [client] = await Promise.all([Cliente.find()]);
    if ( client ) return res.status(200).json({ client });
    
    return res.status(200).send('No hay clientes');
};

export const obtenerClienteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    if ( cliente ) return res.status(200).send({ cliente: cliente });
    return res.status(200).send({
        message: 'No hay cliente',
    });
};

export const crearCliente = async (req: Request, res: Response) => {
    const { ...body } = req.body;
    
    // const clienteExiste = await Cliente.findOne({ user: body.user });
    // if ( clienteExiste ) {
    //     const { user } = clienteExiste;
    //     res.status(200).json({
    //         message: `El cliente con este usuario ya existe ${ user }`
    //     });
    // }
    
    const cliente = new Cliente(body);
    await cliente.save();
    res.status(200).send({
        message: 'Usuario registrado',
    });
};

// const actualizarCliente = async (req, res = response) => {
// 	const { id } = req.params;
// 	const { body } = req.body;

// 	const clienteActualizado = await Cliente.findByIdAndUpdate(id, body, {
// 		new: true,
// 	});
// 	res.json(clienteActualizado);
// };

// const borrarCliente = async (req, res = response) => {
// 	const { id } = req.params;
// 	const clienteBorrado = await Cliente.findByIdAndDelete(
// 		id,
// 		{ estado: false },
// 		{ new: true }
// 	);
// 	res.json(clienteBorrado);
// };

export const loginCliente = async (req: Request, res: Response) => {
    const body = req.query;
    const clientelogeado = await Cliente.findOne({ user: body.user });
    
    if ( clientelogeado ) {
        const { password, user } = clientelogeado;
        if ( body.user === user && body.password === password ) {
            res.status(200).send({
                jwt    : jwt(clientelogeado),
                message: 'Cliente logeado',
                datos  : clientelogeado,
            });
        } else {
            res.status(200).send({
                message: `Cliente no encontrado`,
            });
        }
    } else {
        res.status(200).send({
            message: `El cliente con este nombre no existe ${ body.user }`,
        });
    }
};
