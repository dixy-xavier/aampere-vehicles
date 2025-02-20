'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { getVehicles } from '@/utils/services';
import { Vehicle } from '@/types';

const VehicleList = () => {
    const [state, setState] = useState({
        vehicles: [] as Vehicle[],
        totalPages: 0,
        page: 1,
        loading: true,
        sort: false,
    });
    const LIMIT = 10;

    const fetchVehicles = useCallback(async () => {
        setState(prevState => ({ ...prevState, loading: true }));
        const vehiclesData: { count: number; data: Vehicle[] } = await getVehicles({ page: state.page, sort: state.sort });
        setState(prevState => ({
            ...prevState,
            vehicles: vehiclesData.data,
            totalPages: prevState.totalPages || Math.ceil(vehiclesData.count / LIMIT),
            loading: false,
        }));
    }, [state.page, state.sort]);

    useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles]);

    const toggleSort = useCallback(() => {
        setState(prevState => ({ ...prevState, sort: !prevState.sort }));
    }, []);

    const loadPrevious = useCallback(() => {
        if (state.page > 1) {
            setState(prevState => ({ ...prevState, page: prevState.page - 1 }));
        }
    }, [state.page]);

    const loadMore = useCallback(() => {
        if (state.page < state.totalPages) {
            setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
        }
    }, [state.page, state.totalPages]);

    return (
        <div>
            <h1>Vehicle List</h1>
            {state.loading ? <p>Loading...</p> : (
                <div>
                    <div>
                        <button onClick={toggleSort}>{state.sort ? 'Unsort' : 'Sort by brand'}</button>
                    </div>
                    <ul>
                        {state.vehicles.map(vehicle => (
                            <li key={vehicle.id}>
                                <Link href={`/vehicles/${vehicle.id}`}>
                                    {vehicle.brand} {vehicle.model} {vehicle.year}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <button onClick={loadPrevious}>Load previous</button>
                        <button onClick={loadMore}>Load more</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VehicleList;