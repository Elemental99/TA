import { NextFunction, Request, Response } from 'express'

const ERROR_HANDLERS: any = {
    MongoNotConnectedError: (res: Response) =>
        res.status(500).send({
            error: 'Error de conexión con la base de datos',
        }),
    CastError: (res: Response) =>
        res.status(400).send({
            message: 'Id incorrecto',
        }),
    ValidationError: (res: Response, { message }: any) =>
        res.status(409)
            .send({
                error: message,
            }),
    JsonWebTokenError: (res: Response) =>
        res.status(401).json({
            error: 'Token no valido',
        }),
    TokenExpiredError: (res: Response) =>
        res.status(498).json({
            error: 'Token expirado',
        }),
    defaultError: (res: Response) =>
        res.status(500).send({
            message: 'Error del servidor',
        }),
}

export const handleErrors = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(error.name)
    const handler = ERROR_HANDLERS[error.name] ||
        ERROR_HANDLERS.defaultError

    handler(res, error)
}
