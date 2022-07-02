import { Router } from 'express'
import {
    obtenerMenu,
    obtenerMenuByBar,
    obtenerMenus,
} from '../controllers/menu'
import { handleErrors } from '../middlewares/handleErrors'

const router = Router()

router.get('/', obtenerMenus)
router.get('/obtenerMenu/:id', obtenerMenu)
router.get('/obtenerMenuByBar/:id', obtenerMenuByBar)
// router.post('/', crearMenu);
// router.put('/:id', actualizarMenu);
// router.delete('/:id', borrarMenu);

router.use(handleErrors)

export default router
