import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import { join } from 'path';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const jsonFilePath = join(process.cwd(), 'public/data', 'vehicle_data.json');
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        const vehiclesData = JSON.parse(jsonData);
        const { vehicleId } = req.query;
        if (vehicleId) {
            const vehicle = vehiclesData.data.find(({ brand, model, year }: { brand: string, model: string, year: number }) => {
                const id = `${brand}*${model}*${year}`.replace(/\s/g, '_');
                return id === vehicleId;
            });
            if (vehicle) {
                res.status(200).json(vehicle);
            } else res.status(404).json({ error: 'Vehicle not found' });
        }
    } catch (error) {
        res.status(404).json({ error, errorMessage: 'Vehicle not found' });
    }
};

export default handler;