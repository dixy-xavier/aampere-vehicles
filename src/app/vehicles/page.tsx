'use client';
import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useVehicles } from './hooks';
import { debounce } from '@/utils/general';
import { LIMIT } from '@/utils/contants';

const VehicleList = () => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState(false);
    const [filterText, setFilterText] = useState('');
    const { vehicles, totalPages, loading } = useVehicles(page, sort, filterText);

    const toggleSort = useCallback(() => {
        setSort(prevSort => !prevSort);
    }, []);

    const debounceFilter = useMemo(() => debounce((filterText: string) => {
        setPage(1);
        setFilterText(filterText);
    }, 300), []);

    const loadPrevious = useCallback(() => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    }, [page]);

    const loadMore = useCallback(() => {
        if (page < totalPages && vehicles.length >= LIMIT) {
            setPage(prevPage => prevPage + 1);
        }
    }, [page, totalPages]);

    return (
        <div>
            <h1>Vehicle List</h1>
            {vehicles.length === 0 && loading ? <p>Loading...</p> : (
                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="Filter by brand or model"
                            onChange={(e) => {
                                const filterText = e.target.value.toLowerCase();
                                debounceFilter(filterText);
                            }}
                        />
                    </div>
                    {!loading && vehicles.length > 0 && <div>
                        <button onClick={toggleSort}>{sort ? 'Unsort' : 'Sort by brand'}</button>
                    </div>}
                    <ul>
                        {vehicles.map(vehicle => (
                            <li key={vehicle.id}>
                                <Link href={`/vehicles/${vehicle.id}`}>
                                    {vehicle.brand} {vehicle.model} {vehicle.year}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {!loading && vehicles.length > 0 && <div>
                        <button onClick={loadPrevious}>Load previous</button>
                        <button onClick={loadMore}>Load more</button>
                    </div>}
                </div>
            )}
            {!loading && vehicles.length === 0 && <p>No vehicles found</p>}
        </div>
    );
};

export default VehicleList;
