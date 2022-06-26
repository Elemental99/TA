import { Router } from 'express'
import { crearPlato, obtenerPlatos } from '../controllers/plato'
import { handleErrors } from '../middlewares/handleErrors'
import { isAuthenticated } from '../helpers/authentic'

const router = Router()

router.get('/', isAuthenticated, obtenerPlatos)
// router.get('/:id', obtenerPlato);
router.post('/', isAuthenticated, crearPlato)
// router.put('/:id', actualizarPlato);
// router.delete('/:id', borrarPlato);

router.use(handleErrors)

export default router
