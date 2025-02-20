import { Vehicle } from "@/types";

const getRequest = async <T>(url: string): Promise<T> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getVehicles = async () => {
    const response: {
        count: number,
        data: [],
    } = await getRequest('http://localhost:3000/api/vehicles');
    return response.data;
};

const getVehicle = async (vehicleId: string) => {
    const query = new URLSearchParams({ vehicleId }).toString();
    const response: Vehicle = await getRequest(`http://localhost:3000/api/vehicle?${query}`);
    return response;
};

export  {
    getVehicles,
    getVehicle,
};