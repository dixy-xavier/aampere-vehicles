'use client';
import { useCallback, useState } from 'react';
import { useVehicleListActions, useVehicles } from './hooks';
import { Box, Card, CardHeader, Container, Typography } from '@mui/material';
import VehicleListContent from './VehicleListContent';

const Vehicles = () => {
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
        <Container sx={{ height: "100%" }}>
            <Box display="flex" justifyContent="center" height="100%"> 
                <Card>
                    <CardHeader title="Vehicle List" />
                    {loading ? (
                    <Typography>{vehicles.length === 0 ? 'Loading...' : 'Loading more vehicles...'}</Typography>
                    ) : (
                        <>
                            {vehicles.length === 0 ? (
                            <Typography>No vehicles found</Typography>
                            ) : (
                            <VehicleListContent
                                loading={loading}
                                sort={sort}
                                handleFilterChange={handleFilterChange}
                                toggleSort={toggleSort}
                                loadPrevious={loadPrevious}
                                loadMore={loadMore}
                                vehicles={vehicles}
                            />
                            )}
                        </>
                    )}
                </Card>
            </Box>
        </Container>
    );
};

export default Vehicles;
