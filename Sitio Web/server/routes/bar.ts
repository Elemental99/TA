import { Router } from 'express'
import { crearBar, obtenerBarById, obtenerBares } from '../controllers/bar'
import { handleErrors } from '../middlewares/handleErrors'
import { isAuthenticated } from '../helpers/authentic'

const router = Router()

router.get('/', obtenerBares)
router.get('/:id', obtenerBarById)
router.post('/', crearBar)
// router.put('/:id', actualizarBar);
// router.delete('/:id', borrarBar);

router.use(handleErrors)

export default router
