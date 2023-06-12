import { ok, serverError } from "../helpers/http-response";
import { HttpRequest, HttpResponse } from "../ports/http";
import { Controller } from "../ports/controller";
import { LoadByVehiclesUsecase } from "../../../application/usecases/load-by-vehicles.usecase";

export class LoadByVehicleController implements Controller {
  constructor(private readonly useCase: LoadByVehiclesUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { field, value } = request.query;
      const result = await this.useCase.execute({ field, value });
      return ok(result);
    } catch (error) {
      return serverError();
    }
  }
}