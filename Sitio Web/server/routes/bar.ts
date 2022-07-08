import { Router } from 'express'
import {
    actualizarBar,
    borrarBar,
    crearBar,
    obtenerBarById,
    obtenerBares,
} from '../controllers/bar'
import { handleErrors } from '../middlewares/handleErrors'

const router = Router()

// router.get( '/', obtenerBares )
// router.get( '/:id', isAuthenticated, obtenerBarById )
// router.post( '/', isAuthenticated, crearBar )
// router.put( '/:id', actualizarBar )
// router.delete( '/:id', borrarBar )
router.get( '/', obtenerBares )
router.get( '/:id', obtenerBarById )
router.post( '/', crearBar )
router.put( '/:id', actualizarBar )
router.delete( '/:id', borrarBar )

router.use( handleErrors )

export default router
