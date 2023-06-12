import { LoadByVehiclesUsecase } from "../../../application/usecases/load-by-vehicles.usecase";
import { VehicleRepository } from "../../database/repositories/vehicle.repository";
import { LoadByVehicleController } from "../controller/load-by-vehicle.controller";

export const LoadByVehicleFactory = (db: any): LoadByVehicleController => {
  const repository = new VehicleRepository(db);
  const usecase = new LoadByVehiclesUsecase(repository);
  const controller = new LoadByVehicleController(usecase);
  return controller;
}