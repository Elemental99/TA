const { Router } = require('express');

const {
	obtenerBares,
	// obtenerBar,
	// crearBar,
	// actualizarBar,
	// borrarBar
} = require('../controllers').Bar;

const router = Router();

router.get('/', obtenerBares);
// router.get('/:id', obtenerBar);
// router.post('/', crearBar);
// router.put('/:id', actualizarBar);
// router.delete('/:id', borrarBar);

module.exports = router;
