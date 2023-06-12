import { randomUUID } from "crypto";
import { Either, right } from "../../shared/either";

export type Nullable<T> = T | null;

export interface VehicleProps {
    prefix: Nullable<string>;
    vehicle: Nullable<string>;
    brand: Nullable<string>;
    model: Nullable<string>;
    plate: Nullable<string>;
    asset_number: Nullable<string>;
    color: Nullable<string>;
    year_manufacture: Nullable<number>;
    year_model: Nullable<number>;
    fuel: Nullable<string>;
    chassis_number: Nullable<string>;
    secretary: Nullable<string>;
    unit: Nullable<string>;
    observation: Nullable<string>;
}

interface VehicleData {
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
  
export class Vehicle {
    public readonly id: string;
    public readonly prefix: Nullable<string>;
    public readonly vehicle: Nullable<string>;
    public readonly brand: Nullable<string>;
    public readonly model: Nullable<string>;
    public readonly plate: Nullable<string>;
    public readonly asset_number: Nullable<string>;
    public readonly color: Nullable<string>;
    public readonly year_manufacture: Nullable<number>;
    public readonly year_model: Nullable<number>;
    public readonly fuel: Nullable<string>;
    public readonly chassis_number: Nullable<string>;
    public readonly secretary: Nullable<string>;
    public readonly unit: Nullable<string>;
    public readonly observation: Nullable<string>;
    
    private constructor(props: VehicleProps,  id?: string) {
        this.id = id || randomUUID();
        this.prefix = props.prefix;
        this.vehicle = props.vehicle;
        this.brand = props.brand;
        this.model = props.model;
        this.plate = props.plate;
        this.asset_number = props.asset_number;
        this.color = props.color;
        this.year_manufacture = props.year_manufacture;
        this.year_model = props.year_model;
        this.fuel = props.fuel;
        this.chassis_number = props.chassis_number;
        this.secretary = props.secretary;
        this.unit = props.unit;
        this.observation = props.observation;
    }

    static create(vehicleData: VehicleData, id?: string): Either<string, Vehicle> {
        const vehicle = {
            prefix: vehicleData.prefix ? vehicleData.prefix : null,
            vehicle: vehicleData.vehicle ? vehicleData.vehicle : null,
            brand: vehicleData.brand ? vehicleData.brand : null,
            model: vehicleData.model ? vehicleData.model : null,
            plate: vehicleData.plate ? vehicleData.plate : null,
            asset_number: vehicleData.asset_number ? vehicleData.asset_number : null,
            color: vehicleData.color ? vehicleData.color : null,
            year_manufacture: vehicleData.year_manufacture ? vehicleData.year_manufacture : null,
            year_model: vehicleData.year_model ? vehicleData.year_model : null,
            fuel: vehicleData.fuel ? vehicleData.fuel : null,
            chassis_number: vehicleData.chassis_number ? vehicleData.chassis_number : null,
            secretary: vehicleData.secretary ? vehicleData.secretary : null,
            unit: vehicleData.unit ? vehicleData.unit : null,
            observation: vehicleData.observation ? vehicleData.observation : null,
        }
        return right(new Vehicle(vehicle, id));
    }
}