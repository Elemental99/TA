const { Router } = require('express');

const {
	obtenerMenus,
	// obtenerMenu,
	// crearMenu,
	// actualizarMenu,
	// borrarMenu
} = require('../controllers').Menu;

const router = Router();

router.get('/', obtenerMenus);
// router.get('/:id', obtenerMenu);
// router.post('/', crearMenu);
// router.put('/:id', actualizarMenu);
// router.delete('/:id', borrarMenu);

module.exports = router;
