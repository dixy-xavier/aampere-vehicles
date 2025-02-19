import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import { join } from 'path';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const jsonFilePath = join(process.cwd(), 'public/data', 'vehicle_data.json');
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        const vehicles = JSON.parse(jsonData);

        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read data' });
    }
};

export default handler;