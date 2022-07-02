import { Router } from 'express'
import { crearPlato, obtenerPlato, obtenerPlatos } from '../controllers/plato'
import { handleErrors } from '../middlewares/handleErrors'

const router = Router()

router.get('/', obtenerPlatos)
router.get('/:id', obtenerPlato)
router.post('/', crearPlato)
// router.put('/:id', actualizarPlato);
// router.delete('/:id', borrarPlato);

router.use(handleErrors)

export default router
