import { Router } from 'express';
import { obtenerBares, crearBar, borrarBar, actualizarBar, obtenerBar } from '../controllers/bar';

const router = Router();

router.get('/', obtenerBares);
router.get('/:id', obtenerBar);
router.post('/registrar', crearBar);
router.put('/editar/:id', actualizarBar);
router.delete('/eliminar/:id', borrarBar);

export default router;
