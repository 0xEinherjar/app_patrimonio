import { NextFunction, Request, Response } from "express"

export const adaptMiddleware = (middleware: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const request = {
            accessToken: req.headers.authorization,
        }
        const result = await middleware.handle(request)
        if (result.status === 200) {
            Object.assign(req, result.data)
            next()
        } else {
            res.status(result.status).json({
                error: result.data
            })
        }
    }
}