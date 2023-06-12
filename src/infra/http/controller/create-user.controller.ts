import { FailureResult } from "../../../application/error/failure-result";
import { UseCase } from "../../../application/ports/usecase";
import { CreateUserInput, CreateUserOutput } from "../../../application/usecases/create-user.usecase";
import { Either } from "../../../shared/either";
import { badRequest, conflict, created, serverError } from "../helpers/http-response";
import { HttpRequest, HttpResponse } from "../ports/http";
import { Controller } from "../ports/controller";
import { TypeFail } from "../../../application/error/type-fail";

type Output = Promise<Either<FailureResult, CreateUserOutput>>;

export class CreateUserController implements Controller {
  constructor(private readonly useCase: UseCase<CreateUserInput, Output>) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { username, password } = request.body;
      const result = await this.useCase.execute({ username, password });
      if (result.isLeft()) {
        const fail = result.value;
        if (fail.type === TypeFail.Business) return badRequest(fail.message);
        if (fail.type === TypeFail.Conflict) return conflict(fail.message);
      }
      return created(result.value);
    } catch (error) {
      return serverError();
    }
  }
}