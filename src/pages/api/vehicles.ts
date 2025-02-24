import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import { join } from 'path';
import { Vehicle } from '@/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const jsonFilePath = join(process.cwd(), 'public/data', 'vehicle_data.json');
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        const vehiclesData = JSON.parse(jsonData);
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const sortKey = (req.query.sortKey as string | boolean);
        const filter = (req.query.filter as string || '').toLowerCase();

        const vehiclesList = vehiclesData.data.map(({ brand, model, year }: { brand: string, model: string, year: number }) => ({
            brand,
            model,
            year,
            id: `${brand}*${model}*${year}`.replace(/\s/g, '_')
        }));

        const filteredVehicles = filter
            ? vehiclesList.filter(({ brand, model }: Vehicle) => 
                brand.toLowerCase().includes(filter) || 
                model.toLowerCase().includes(filter))
            : vehiclesList;

        const sortedVehicles = sortKey
            ? filteredVehicles.sort((a: Vehicle, b: Vehicle) => {
                const aValue = a[sortKey as keyof Vehicle];
                const bValue = b[sortKey as keyof Vehicle];
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return aValue.localeCompare(bValue);
                }
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return aValue - bValue;
                }
                return 0;
            })
            : filteredVehicles;

        const paginatedVehicles = sortedVehicles.slice((page - 1) * limit, page * limit);

        res.status(200).json({ count: vehiclesData.count, data: paginatedVehicles });
    } catch (error) {
        res.status(500).json({ error: 'Failed to read data' });
    }
};

export default handler;