import { Vehicle } from "../../domain/entities/vehicle";
import { VehicleRepositoryInterface } from "../../domain/repositories/vehicle.repository.interface";
import { Either, left, right } from "../../shared/either";
import { FailureResult } from "../error/failure-result";
import { TypeFail } from "../error/type-fail";
import { UseCase } from "../ports/usecase";

type Output = Promise<Either<FailureResult, CreateVehicleOutput>>

export class CreateVehicleUsecase implements UseCase<CreateVehicleInput, Output> {
    constructor(private vehicleRepository: VehicleRepositoryInterface) {}

    async execute(input: CreateVehicleInput): Output {
        const vehicleOrFail = Vehicle.create(input);
        if (vehicleOrFail.isLeft()) return left({ type: TypeFail.Business, message: vehicleOrFail.value });
        const vehicle = vehicleOrFail.value;
        await this.vehicleRepository.save(vehicle);
        return right({
            id: vehicle.id,
            prefix: vehicle.prefix,
            vehicle: vehicle.vehicle,
            brand: vehicle.brand,
            model: vehicle.model,
            plate: vehicle.plate,
            asset_number: vehicle.asset_number,
            color: vehicle.color,
            year_manufacture: vehicle.year_manufacture,
            year_model: vehicle.year_model,
            fuel: vehicle.fuel,
            chassis_number: vehicle.chassis_number,
            secretary: vehicle.secretary,
            unit: vehicle.unit,
            observation: vehicle.observation
        });
    }
}

export interface CreateVehicleInput {
    prefix?: string;
    vehicle?: string;
    brand?: string;
    model?: string;
    plate?: string;
    asset_number?: string;
    color?: string;
    year_manufacture?: number;
    year_model?: number;
    fuel?: string;
    chassis_number?: string;
    secretary?: string;
    unit?: string;
    observation?: string;
}

export interface CreateVehicleOutput {
    id: string | number;
    prefix: string | null;
    vehicle: string | null;
    brand: string | null;
    model: string | null;
    plate: string | null;
    asset_number: string | null;
    color: string | null;
    year_manufacture: number | null;
    year_model: number | null;
    fuel: string | null;
    chassis_number: string | null;
    secretary: string | null;
    unit: string | null;
    observation: string | null;
}