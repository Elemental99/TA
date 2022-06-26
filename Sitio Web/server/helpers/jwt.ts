import jwt from 'jsonwebtoken'

const secret = process.env.WORD_SECRET

export const createToken = (client: any) => {
    const payload: any = {
        sub : client._id,
        name: client.nombre_cliente,
        user: client.user,
    }
    
    return jwt.sign(payload, String(secret), {
        algorithm: 'HS256',
        expiresIn: Math.floor(Date.now() + (24 * 60 * 60 * 1000
        )),
    })
}
