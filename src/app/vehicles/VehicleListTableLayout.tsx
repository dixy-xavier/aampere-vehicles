import { Vehicle } from '@/types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

const VehicleListTableLayout: React.FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => {
    const router = useRouter();
    const handleClick = useCallback((id: string) => {
        router.push(`/vehicles/${id}`);
    }, [router]);

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
                    {vehicles.map(({ id, brand, model, year }: Vehicle) => (
                        <TableRow 
                            key={id} 
                            onClick={() => handleClick(id)} 
                            style={{ cursor: 'pointer' }}
                            hover
                        >
                            <TableCell>{brand}</TableCell>
                            <TableCell>{model}</TableCell>
                            <TableCell>{year}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VehicleListTableLayout;