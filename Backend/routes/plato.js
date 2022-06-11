const { Router } = require('express');

const {
	obtenerPlatos,
	// obtenerPlato,
	// crearPlato,
	// actualizarPlato,
	// borrarPlato,
} = require('../controllers').Plato;

const router = Router();

router.get('/', obtenerPlatos);
// router.get('/:id', obtenerPlato);
// router.post('/', crearPlato);
// router.put('/:id', actualizarPlato);
// router.delete('/:id', borrarPlato);

module.exports = router;
