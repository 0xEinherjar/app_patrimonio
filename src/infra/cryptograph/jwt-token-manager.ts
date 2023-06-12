import * as jwt from 'jsonwebtoken';
import { Either, left, right } from '../../shared/either';
import { Payload, TokenManager } from '../../application/ports/token-manager';

export class JwtTokenManager implements TokenManager {
  constructor(private readonly secret: any) {}

  async sign(info: Payload, expires?: string): Promise<string> {
    if (expires) {
      return jwt.sign(info, this.secret, { expiresIn: expires });
    }
    return jwt.sign(info, this.secret, { expiresIn: '1d' });
  }

  async verify(token: string): Promise<Either<any, Payload>> {
    try {
      const decoded = jwt.verify(token, this.secret);
      return right({id: decoded as string });
    } catch (error: any) {
      return left(error.message);
    }
  }
}