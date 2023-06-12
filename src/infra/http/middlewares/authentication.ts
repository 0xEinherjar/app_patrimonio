import { AuthenticationFactory } from '../factories/authentication.factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'

export const authentication = (db: any) => adaptMiddleware(AuthenticationFactory(db));
