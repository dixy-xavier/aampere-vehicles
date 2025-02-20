'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { getVehicles } from '@/utils/services';
import { Vehicle } from '@/types';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const LIMIT = 10;

    const fetchVehicles = useCallback(async () => {
        setLoading(true);
        const vehiclesData: { count: number; data: Vehicle[] } = await getVehicles({ page });
        setVehicles(vehiclesData.data);
        if (totalPages === 0) {
            setTotalPages(Math.ceil(vehiclesData.count / LIMIT));
        }
        setLoading(false);
    }, [page, totalPages]);

    useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles]);

    return (
        <div>
            <h1>Vehicle List</h1>
            {loading ? <p>Loading...</p> : (
                <div>
                    <ul>
                        {vehicles.map(vehicle => (
                            <li key={vehicle.id}>
                                <Link href={`/vehicles/${vehicle.id}`}>
                                    {vehicle.brand} {vehicle.model} {vehicle.year}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <button onClick={() => page > 1 && setPage(page - 1)}>Load previous</button>
                        <button onClick={() => page < totalPages && setPage(page + 1)}>Load more</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VehicleList;