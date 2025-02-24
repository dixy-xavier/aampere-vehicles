export interface Vehicle {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    range: number;
    color: string;
    condition: string;
    battery_capacity_kWh: number;
    charging_speed_kW: number;
    seats: number;
    drivetrain: string;
    location: string;
    autopilot: false;
    kilometer_count: number;
    accidents: false;
    accident_description?: string;
    images: string[];
}

export const vehicleInitialState: Vehicle = {
    id: '',
    brand: '',
    model: '',
    year: 0,
    price: 0,
    range: 0,
    color: '',
    condition: '',
    battery_capacity_kWh: 0,
    charging_speed_kW: 0,
    seats: 0,
    drivetrain: '',
    location: '',
    autopilot: false,
    kilometer_count: 0,
    accidents: false,
    accident_description: '',
    images: [],
};

export interface VehicleListContentProps {
    loading: boolean;
    loadPrevious: () => void;
    loadMore: () => void;
    sortBy: (sortKey: string) => void;
    vehicles: Vehicle[];
}
