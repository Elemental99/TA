import { Router } from 'express'
import {
	actualizarReservacion,
	borrarReservacion,
	obtenerReservacionbyId,
	crearReservacion,
	obtenerReservacion,
	obtenerReservaciones,
} from '../controllers/reservacion'
import { handleErrors } from '../middlewares/handleErrors'
import { isAuthenticated } from '../helpers/authentic'

const router = Router()

router.get('/', obtenerReservaciones)
router.get('/:id', obtenerReservacion)
router.get('/obtenerReservacion/:id', obtenerReservacionbyId);
router.post('/', crearReservacion)
router.put('/:id', actualizarReservacion)
router.delete('/:id', borrarReservacion)

router.use(handleErrors)

export default router
