'use client';
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useVehicleListActions, useVehicles } from './hooks';
import '@/styles/globals.css';

const VehicleList = () => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState(false);
    const [filterText, setFilterText] = useState('');
    const { vehicles, totalPages, loading } = useVehicles(page, sort, filterText);
    const { toggleSort, debounceFilter, loadPrevious, loadMore } = useVehicleListActions(page, setPage, setSort, setFilterText, totalPages, vehicles);

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const filterText = e.target.value.toLowerCase();
        debounceFilter(filterText);
    }, [debounceFilter]);

    return (
        <div>
            <h1>Vehicle List</h1>
            {loading && vehicles.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="Filter by brand or model"
                            onChange={handleFilterChange}
                        />
                    </div>
                    {!loading && vehicles.length > 0 && (
                        <div>
                            <button onClick={toggleSort}>{sort ? 'Unsort' : 'Sort by brand'}</button>
                        </div>
                    )}
                    <ul>
                        {vehicles.map(({ id, brand, model, year }) => (
                            <li key={id}>
                                <Link href={`/vehicles/${id}`} className='text-3xl text-green-600 p-2'>
                                    {brand} {model} {year}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {!loading && vehicles.length > 0 && (
                        <div>
                            <button onClick={loadPrevious}>Load previous</button>
                            <button onClick={loadMore}>Load more</button>
                        </div>
                    )}
                </div>
            )}
            {!loading && vehicles.length === 0 && <p>No vehicles found</p>}
        </div>
    );
};

export default VehicleList;
