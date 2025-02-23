import { Vehicle } from '@/types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation'

const VehicleListTableLayout: React.FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => {
    const router = useRouter();
    const handleClick = useCallback((id: string) => {
        router.push(`/vehicles/${id}`);
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Make</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Year</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vehicles.map((vehicle: Vehicle) => (
                        <TableRow key={vehicle.id} onClick={() => handleClick(vehicle.id)}>
                            <TableCell>{vehicle.brand}</TableCell>
                            <TableCell>{vehicle.model}</TableCell>
                            <TableCell>{vehicle.year}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VehicleListTableLayout;