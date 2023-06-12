import { UserRepository } from "../../data/repositories/user.repository";
import { Payload, TokenManager } from "../../application/ports/token-manager";
import { HttpResponse } from "../http/ports/http";
import { forbidden, ok, serverError } from "../http/helpers/http-response";

export class Authentication {
  constructor(private token: TokenManager, private repository: UserRepository) {}

  async handle(request: AuthRequest): Promise<HttpResponse> {
    try {
      const { accessToken } = request;
      if (!accessToken) return forbidden("Token missing");
      const [, token] = accessToken.split(" ");
      const decodedTokenOrError = await this.token.verify(token);
      if (decodedTokenOrError.isLeft()) return forbidden(decodedTokenOrError.value);
      const payload: Payload = decodedTokenOrError.value as Payload;
      const user = await this.repository.findById(payload.id);
      if (user) return forbidden("User not allowed to perform this operation");
      return ok({ id: payload.id });
    } catch (error) {
      return serverError();
    }
  }
}

export type AuthRequest = {
  accessToken: string;
}