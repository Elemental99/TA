import { Router } from 'express'
import { obtenerMenus } from '../controllers/menu'
import { handleErrors } from '../middlewares/handleErrors'
import { isAuthenticated } from '../helpers/authentic'

const router = Router()

router.get('/', isAuthenticated, obtenerMenus)
// router.get('/:id', obtenerMenu);
// router.post('/', crearMenu);
// router.put('/:id', actualizarMenu);
// router.delete('/:id', borrarMenu);

router.use(handleErrors)

export default router
