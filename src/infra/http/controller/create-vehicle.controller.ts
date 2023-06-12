import { FailureResult } from "../../../application/error/failure-result";
import { UseCase } from "../../../application/ports/usecase";
import { Either } from "../../../shared/either";
import { badRequest, created, serverError } from "../helpers/http-response";
import { HttpRequest, HttpResponse } from "../ports/http";
import { Controller } from "../ports/controller";
import { TypeFail } from "../../../application/error/type-fail";
import { CreateVehicleInput, CreateVehicleOutput } from "../../../application/usecases/create-vehicle.usecase";

type Output = Promise<Either<FailureResult, CreateVehicleOutput>>;

export class CreateVehicleController implements Controller {
  constructor(private readonly useCase: UseCase<CreateVehicleInput, Output>) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        prefix, vehicle, brand, model, plate, asset_number,
        color, year_manufacture, year_model, fuel,
        chassis_number, secretary, unit, observation
      } = request.body;
      const result = await this.useCase.execute({
        prefix, vehicle, brand, model, plate, asset_number,
        color, year_manufacture, year_model, fuel, 
        chassis_number, secretary, unit, observation
      });
      if (result.isLeft()) {
        const fail = result.value;
        if (fail.type === TypeFail.Business) return badRequest(fail.message);
      }
      return created(result.value);
    } catch (error) {
      return serverError();
    }
  }
}