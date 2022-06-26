import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const secret = process.env.WORD_SECRET

export const isAuthenticated = async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authorization      = req.get('authorization')
    let token: string | null = null
    if ( authorization && authorization.toLowerCase().startsWith('bearer') ) {
        token = authorization.split(' ')[1]
    }
    
    try {
        await jwt.verify(String(token), String(secret))
        return next()
    } catch (error) {
        next(error)
    }
}
