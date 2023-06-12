import { Vehicle } from "../../../domain/entities/vehicle";
import { VehicleRepositoryInterface } from "../../../domain/repositories/vehicle.repository.interface";

export class VehicleRepository implements VehicleRepositoryInterface {
    constructor(private db: any) {}

    async save(vehicle: Vehicle): Promise<void> {
        await this.db.collection("vehicle").add({
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

    async load(): Promise<Vehicle[]> {
        const snapshot = await this.db.collection("vehicle").get();
        const vehicles: Vehicle[] = [];
        snapshot.forEach((doc: any) => {
            const vehicle = Vehicle.create(doc.data());
            if (vehicle.isRight()) vehicles.push(vehicle.value);
        });
        return vehicles;
    }

    async loadBy(property: any, value: any): Promise<Vehicle[]> {
        const snapshot = await this.db.collection("vehicle").where(property, '==', value).get();
        if (snapshot.empty) return [];
        const vehicles: Vehicle[] = [];
        snapshot.forEach((doc: any) => {
            let vehicle = Vehicle.create(doc.data());
            if (vehicle.isRight()) vehicles.push(vehicle.value);
        });
        return vehicles;
    }
}