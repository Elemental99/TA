import { Router } from 'express'
import UserController from '../controllers/user'
import { verifyToken } from '../lib/helpers'

const {
    home,
    login,
    register,
} = UserController

const router = Router()

router.get( '/', verifyToken, home )

router.get( '/login', verifyToken, ( req: any, res ) => {
    return res.render( 'login', {
        user: req.datos,
    } )
} )

router.post( '/login', verifyToken, login )

router.get( '/register', verifyToken, ( req: any, res ) => {
    return res.render( 'register', {
        user: req.datos,
    } )
} )

router.get( '/logout', verifyToken, ( req: any, res ) => {
    res.clearCookie( 'jwt' )
    res.clearCookie( 'id' )
    return res.redirect( '/login' )
} )

router.post( '/register', verifyToken, register )

export default router
