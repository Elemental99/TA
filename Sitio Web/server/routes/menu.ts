import { Router } from 'express'
import {
    obtenerMenu,
    obtenerMenuByBar,
    obtenerMenuByPlato,
    obtenerMenus,
} from '../controllers/menu'
import { handleErrors } from '../middlewares/handleErrors'
import { isAuthenticated } from '../helpers/authentic'

const router = Router()

router.get( '/', isAuthenticated, obtenerMenus )
router.get( '/obtenerMenu/:id', isAuthenticated, obtenerMenu )
router.get( '/obtenerMenuByBar/:id', isAuthenticated, obtenerMenuByBar )
router.get( '/obtenerMenuByPlato/:id', isAuthenticated, obtenerMenuByPlato )
// router.post('/', crearMenu);
// router.put('/:id', actualizarMenu);
// router.delete('/:id', borrarMenu);

router.use( handleErrors )

export default router
