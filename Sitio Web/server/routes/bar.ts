import { Router } from 'express';
import { obtenerBares, crearBar } from '../controllers/bar';

const router = Router();

router.get('/', obtenerBares);
// router.get('/:id', obtenerBar);
router.post('/', crearBar);
// router.put('/:id', actualizarBar);
// router.delete('/:id', borrarBar);

export default router;
