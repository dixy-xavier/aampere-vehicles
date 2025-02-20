import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import { join } from 'path';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const jsonFilePath = join(process.cwd(), 'public/data', 'vehicle_data.json');
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        const vehiclesData = JSON.parse(jsonData);
        const vehiclesList = vehiclesData.data.map(({ brand, model, year }: { brand: string, model: string, year: number }) => ({
            brand,
            model,
            year,
            id: `${brand}*${model}*${year}`.replace(/\s/g, '_')
        }));

        res.status(200).json({ count: vehiclesData.count, data: vehiclesList });
    } catch (error) {
        res.status(500).json({ error: 'Failed to read data' });
    }
};

export default handler;