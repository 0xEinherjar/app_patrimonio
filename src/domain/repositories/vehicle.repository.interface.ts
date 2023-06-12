import { User } from "../entities/user";
import { Vehicle } from "../entities/vehicle";

export interface VehicleRepositoryInterface {
    save(vehicle: Vehicle): Promise<void>;
    load(): Promise<Vehicle[]>;
    loadBy(property: any, value: any): Promise<Vehicle[]>;
}