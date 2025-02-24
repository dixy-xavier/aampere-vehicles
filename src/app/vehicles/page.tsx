'use client';
import { useCallback, useState } from 'react';
import { useVehicleListActions, useVehicles } from './hooks';
import { Box, Card, CardContent, CardHeader, Container, Input, Skeleton, Typography } from '@mui/material';
import VehicleListContent from './VehicleListContent';

const Vehicles = () => {
    const [page, setPage] = useState(1);
    const [sortKey, setSortKey] = useState('');
    const [filterText, setFilterText] = useState('');
    const { vehicles, totalPages, loading } = useVehicles(page, sortKey, filterText);
    const { debounceFilter, loadPrevious, loadMore } = useVehicleListActions(page, setPage, totalPages, vehicles);

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const filterText = e.target.value.toLowerCase();
        setFilterText(filterText);
        debounceFilter(filterText);
    }, [debounceFilter]);
    
    return (
        <Container sx={{ height: "100%" }}>
            <Box display="flex" justifyContent="center" height="100%"> 
                <Card sx={{ width: "100%" }}>
                    <CardHeader title="Vehicle List" />
                    <CardContent>
                        <Input
                                type="text"
                                placeholder="Filter by brand or model"
                                onChange={handleFilterChange}
                                fullWidth
                                value={filterText}
                            />
                    </CardContent>
                    <CardContent>
                        {loading ? (
                            <>
                                <Skeleton variant="rounded" height={600} />
                                <Skeleton variant="text" height={50} />
                            </>
                        ) : (
                            <>
                                {vehicles.length === 0 ? (
                                <Typography>No vehicles found</Typography>
                                ) : (
                                <VehicleListContent
                                    loading={loading}
                                    loadPrevious={loadPrevious}
                                    loadMore={loadMore}
                                    sortBy={(sortByKey: string) => { setPage(1); setSortKey(sortByKey) }}
                                    vehicles={vehicles}
                                />
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Vehicles;
