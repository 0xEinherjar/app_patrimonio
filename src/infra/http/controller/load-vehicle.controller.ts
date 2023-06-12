import { ok, serverError } from "../helpers/http-response";
import { HttpResponse } from "../ports/http";
import { Controller } from "../ports/controller";
import { LoadVehiclesUsecase } from "../../../application/usecases/load-vehicles.usecase";

export class LoadVehicleController implements Controller {
  constructor(private readonly useCase: LoadVehiclesUsecase) {}

  async handle(): Promise<HttpResponse> {
    try {
      const result = await this.useCase.execute();
      return ok(result);
    } catch (error) {
      return serverError();
    }
  }
}