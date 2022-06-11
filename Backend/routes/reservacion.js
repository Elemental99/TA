const { Router } = require('express');

const {
	// obtenerReservaciones,
	obtenerReservacion,
	crearReservacion,
	actualizarReservacion,
	borrarReservacion,
	// obtenerReservacionbyId,
} = require('../controllers').Reservacion;
const router = Router();

// router.get('/', obtenerReservaciones);
router.get('/:id', obtenerReservacion);
// router.get('/hola/:id', obtenerReservacionbyId);
router.post('/', crearReservacion);
router.put('/:id', actualizarReservacion);
router.delete('/:id', borrarReservacion);

module.exports = router;
