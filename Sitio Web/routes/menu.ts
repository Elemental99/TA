import { Router } from 'express';
import { obtenerMenus, crearMenu } from '../controllers/menu';

const router = Router();

router.get('/', obtenerMenus);
// router.get('/:id', obtenerMenu);
router.post('/', crearMenu);
// router.put('/:id', actualizarMenu);
// router.delete('/:id', borrarMenu);

export default router;
