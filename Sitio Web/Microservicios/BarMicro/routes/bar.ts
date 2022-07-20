import { Router } from 'express'
import { Bar } from '../controllers'
import { handleErrors } from '../middlewares/handleErrors'

const { obtenerBares, crearBar, obtenerBarById, actualizarBar, borrarBar } = Bar

// import funciones from '../middlewares';

// const { validarCampos } = funciones;

const router = Router()

router.get( '/obtenerBares', obtenerBares )
router.get( '/obtenerBar/:id', obtenerBarById )
router.post( '/crearBar', crearBar )
router.put( '/actualizarBar/:id', actualizarBar )
router.delete( '/borrarBar/:id', borrarBar )

router.use( handleErrors )

export default router
