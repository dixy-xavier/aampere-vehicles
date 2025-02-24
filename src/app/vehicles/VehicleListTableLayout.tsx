import { Vehicle } from '@/types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { KEY_STRINGS } from '@/utils/constants';

const VehicleListTableLayout: React.FC<{ vehicles: Vehicle[], sortBy: (key: string) => void }> = ({ vehicles, sortBy }) => {
    const router = useRouter();
    const handleClick = useCallback((id: string) => {
        router.push(`/vehicles/${id}`);
    }, [router]);

    const tableRows = useMemo(() => {
        return vehicles.map(({ id, brand, model, year }: Vehicle) => (
            <TableRow 
                key={id}
                data-testid={`vehicle-row-${id}`}
                onClick={() => handleClick(id)} 
                style={{ cursor: 'pointer' }}
                hover
            >
                <TableCell>{brand}</TableCell>
                <TableCell>{model}</TableCell>
                <TableCell>{year}</TableCell>
            </TableRow>
        ));
    }, [vehicles, handleClick]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow
                        style={{ cursor: 'pointer' }}
                        hover
                    >
                        <TableCell onClick={() => sortBy('brand')}>{KEY_STRINGS.brand}</TableCell>
                        <TableCell onClick={() => sortBy('model')}>{KEY_STRINGS.model}</TableCell>
                        <TableCell onClick={() => sortBy('year')}>{KEY_STRINGS.year}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default React.memo(VehicleListTableLayout);