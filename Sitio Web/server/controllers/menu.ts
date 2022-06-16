import { Request, Response } from 'express';
import { Menu } from '../models';

export const obtenerMenus = async (req: Request, res: Response) => {
	const query = { estado: true };
	const [menus] = await Promise.all([Menu.find(query)]);
	if (menus) {
		res.status(200).send({
			menus,
		});
	} else {
		res.status(404).send({
			message: 'Menu not found',
		});
	}
};

// const obtenerMenu = async (req, res = response) => {
// 	const { id } = req.params;
// 	const menu = await Menu.findById(id);
// 	res.json(menu);
// };

export const crearMenu = async (req: Request, res: Response) => {
	const { ...body } = req.body;
	// const menuExiste = await Menu.findOne({ nombre: body.nombre });
	// if (menuExiste) {
	// 	res.status(400).json({
	// 		message: `El menu que desea crear ya existe ${menuExiste.nombre}`,
	// 	});
	// }
	const menu = new Menu(body);
	const menuNuevo = await menu.save();
	res.status(201).json(menuNuevo);
};

// const actualizarMenu = async (req, res) => {
// 	const { id } = req.params;
// 	const { estado, ...data } = req.body;
// 	await Menu.findByIdAndUpdate(id, data, { new: true });
// 	res.json(menuModificado);
// };

// const borrarMenu = async (req, res) => {
// 	const { id } = req.params;
// 	const menuBorrado = await Menu.findByIdAndUpdate(
// 		id,
// 		{ estado: false },
// 		{ new: true }
// 	);
// 	res.json(menuBorrado);
// };

