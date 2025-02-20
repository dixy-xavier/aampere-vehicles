'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getVehicles } from '@/utils/services';
import { Vehicle } from '@/types';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            const vehiclesData: Vehicle[] = await getVehicles();
            setVehicles(vehiclesData);
        };

        fetchVehicles();
    }, []);

    return (
        <div>
            <h1>Vehicle List</h1>
            <ul>
                {vehicles.map(vehicle => {
                    return (
                        <li key={vehicle.id}>
                            <Link href={`/vehicles/${vehicle.id}`}>
                                {vehicle.brand} {vehicle.model} {vehicle.year}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default VehicleList;