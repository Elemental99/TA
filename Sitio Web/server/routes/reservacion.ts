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
import { isAuthenticated } from '../helpers/authentic'

const router = Router()

router.get( '/', isAuthenticated, obtenerReservaciones )
router.get( '/:id', isAuthenticated, obtenerReservacion )
router.get( '/obtenerReservacion/:id', isAuthenticated, obtenerReservacionbyId )
router.post( '/', isAuthenticated, crearReservacion )
router.put( '/:id', isAuthenticated, actualizarReservacion )
router.delete( '/:id', isAuthenticated, borrarReservacion )

router.use( handleErrors )

export default router
