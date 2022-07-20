import { Router } from 'express'
import {
    actualizarCliente,
    crearCliente,
    deleteCookies,
    loginCliente,
    obtenerClienteById,
    obtenerClientes,
    obtenerCookies,
} from '../controllers/cliente'
import { handleErrors } from '../middlewares/handleErrors'

const router = Router()

router.post( '/login', loginCliente )
router.get( '/obtenerCliente/:id', obtenerClienteById )
router.get( '/', obtenerClientes ) // Obtener todos los clientes
router.post( '/', crearCliente ) // Crear un nuevo cliente
router.delete( '/cookie/delete', deleteCookies )
router.get( '/cookie/obtenerCookie', obtenerCookies )
router.put( '/actualizarCliente/:id', actualizarCliente )

router.use( handleErrors )

export default router
