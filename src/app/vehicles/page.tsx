'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getVehicles } from '@/utils/services';
import { concatenateAndRemoveSpaces } from '@/utils/general';
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
                    const id = concatenateAndRemoveSpaces([vehicle.brand, vehicle.model, `${vehicle.year}`]);
                    return (
                        <li key={id}>
                            <Link href={`/vehicles/${id}`}>
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