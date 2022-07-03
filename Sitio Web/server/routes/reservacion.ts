import { Router } from 'express'
import {
    actualizarReservacion,
    borrarReservacion,
    crearReservacion,
    obtenerReservacion,
    obtenerReservacionbyId,
    obtenerReservaciones,
} from '../controllers/reservacion'
import { handleErrors } from '../middlewares/handleErrors'

const router = Router()

router.get('/', obtenerReservaciones)
router.get('/:id', obtenerReservacion)
router.get('/obtenerReservacion/:id', obtenerReservacionbyId)
router.post('/', crearReservacion)
router.put('/:id', actualizarReservacion)
router.delete('/:id', borrarReservacion)

router.use(handleErrors)

export default router
