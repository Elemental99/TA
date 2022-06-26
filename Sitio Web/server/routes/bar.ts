import { Router } from 'express'
import { crearBar, obtenerBarById, obtenerBares } from '../controllers/bar'
import { handleErrors } from '../middlewares/handleErrors'
import { isAuthenticated } from '../helpers/authentic'

const router = Router()

router.get('/', isAuthenticated, obtenerBares)
router.get('/:id', isAuthenticated, obtenerBarById)
router.post('/', isAuthenticated, crearBar)
// router.put('/:id', actualizarBar);
// router.delete('/:id', borrarBar);

router.use(handleErrors)

export default router
