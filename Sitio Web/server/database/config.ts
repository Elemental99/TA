import mongoose from 'mongoose'
import { NextFunction, Request, Response } from 'express'

export const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGO_DB_CNN || '', {
            useNewUrlParser   : true,
            useUnifiedTopology: true,
        } as any )
        console.log( 'Base de datos conectada, correctamente' )
    } catch ( error ) {
        console.error( error )
        console.log( 'Error de conexión con la base de datos' )
    }
}

process.on( 'uncaughtException', async(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await mongoose.connection.close()
    } catch ( error ) {
        next( error )
    }
} )
