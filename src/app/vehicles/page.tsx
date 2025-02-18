'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const cars = [
    { id: 1, name: 'Tesla Model S' },
    { id: 2, name: 'BMW i8' },
    { id: 3, name: 'Audi e-tron' },
];

const VehicleList = () => {
    const router = useRouter();
    const params = router;

    return (
        <div>
            <h1>Vehicle List</h1>
            <ul>
                {cars.map(car => (
                    <li key={car.id}>
                        <Link href={`/vehicles/${car.id}`}>
                            {car.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VehicleList;