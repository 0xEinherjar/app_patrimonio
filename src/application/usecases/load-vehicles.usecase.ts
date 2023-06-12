import { VehicleRepositoryInterface } from "../../domain/repositories/vehicle.repository.interface";
import { Vehicle } from "../../domain/entities/vehicle";

export class LoadVehiclesUsecase {
    constructor(private vehicleRepository: VehicleRepositoryInterface) {}

    async execute(): Promise<Vehicle[]> {
        return await this.vehicleRepository.load();
    }
}