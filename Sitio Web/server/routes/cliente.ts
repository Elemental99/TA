import { Router } from 'express'
import {
    crearCliente,
    loginCliente,
    obtenerClienteById,
    obtenerClientes,
} from '../controllers/cliente'
import { handleErrors } from '../middlewares/handleErrors'

const router = Router()

router.post('/login', loginCliente)
router.get('/obtenerCliente/:id', obtenerClienteById)
router.get('/', obtenerClientes) // Obtener todos los clientes
router.post('/', crearCliente) // Crear un nuevo cliente

router.use(handleErrors)

export default router
