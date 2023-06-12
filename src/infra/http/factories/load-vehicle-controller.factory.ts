import { LoadVehiclesUsecase } from "../../../application/usecases/load-vehicles.usecase";
import { VehicleRepository } from "../../database/repositories/vehicle.repository";
import { LoadVehicleController } from "../controller/load-vehicle.controller";

export const LoadVehicleFactory = (db: any): LoadVehicleController => {
  const repository = new VehicleRepository(db);
  const usecase = new LoadVehiclesUsecase(repository);
  const controller = new LoadVehicleController(usecase);
  return controller;
}