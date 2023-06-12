import { VehicleRepositoryInterface } from "../../domain/repositories/vehicle.repository.interface";
import { Vehicle } from "../../domain/entities/vehicle";
import { UseCase } from "../ports/usecase";


export class LoadByVehiclesUsecase implements UseCase<LoadVehicleInput, LoadVehicleOutput> {
    constructor(private vehicleRepository: VehicleRepositoryInterface) {}

    async execute(input: LoadVehicleInput): LoadVehicleOutput {
        return  await this.vehicleRepository.loadBy(input.field, input.value);
    }
}

export interface LoadVehicleInput {
    field: string;
    value: string;
}

export type LoadVehicleOutput = Promise<Vehicle[]>;
