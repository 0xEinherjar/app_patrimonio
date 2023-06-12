import { FailureResult } from "../../../application/error/failure-result";
import { UseCase } from "../../../application/ports/usecase";
import { Either } from "../../../shared/either";
import { forbidden, ok, serverError, unauthorized } from "../helpers/http-response";
import { HttpRequest, HttpResponse } from "../ports/http";
import { Controller } from "../ports/controller";
import { TypeFail } from "../../../application/error/type-fail";
import { LoginInput, LoginOutput } from "../../../application/usecases/login.usecase";

type Output = Promise<Either<FailureResult, LoginOutput>>

export class LoginController implements Controller {
  constructor(private readonly useCase: UseCase<LoginInput, Output>) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { username, password } = request.body;
      const result = await this.useCase.execute({ username, password });
      if (result.isLeft()) {
        const fail = result.value;
        if (fail.type === TypeFail.Unauthorized) return unauthorized(fail.message);
        if (fail.type === TypeFail.Forbidden) return forbidden(fail.message);
      }
      return ok(result.value);
    } catch (error) {
      return serverError();
    }
  }
}