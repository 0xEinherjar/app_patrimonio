import { CreateVehicleUsecase } from "../../../application/usecases/create-vehicle.usecase";
import { VehicleRepository } from "../../database/repositories/vehicle.repository";
import { CreateVehicleController } from "../controller/create-vehicle.controller";

export const CreateVehicleFactory = (db: any): CreateVehicleController => {
  const repository = new VehicleRepository(db);
  const usecase = new CreateVehicleUsecase(repository);
  const controller = new CreateVehicleController(usecase);
  return controller;
}