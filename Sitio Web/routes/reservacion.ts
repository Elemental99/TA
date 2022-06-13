import { Router } from 'express';
import {
	crearReservacion,
	obtenerReservacion,
	actualizarReservacion,
	borrarReservacion,
	obtenerReservaciones,
} from '../controllers/reservacion';

const router = Router();

router.get('/', obtenerReservaciones);
router.get('/:id', obtenerReservacion);
// router.get('/hola/:id', obtenerReservacionbyId);
router.post('/', crearReservacion);
router.put('/:id', actualizarReservacion);
router.delete('/:id', borrarReservacion);

export default router;
