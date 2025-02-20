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

const getVehicles = async (params: { page?: number; limit?: number; sort?: boolean; filter?: string }) => {
    const { page, limit, sort, filter } = params;
    const query = new URLSearchParams({ 
        page: (page || 1).toString(), 
        limit: (limit || 10).toString(), 
        sort: (sort || false).toString(), 
        filter: filter || '' 
    });
    const response: {
        count: number,
        data: Vehicle[],
    } = await getRequest(`http://localhost:3000/api/vehicles?${query}`);
    return response;
};

const getVehicle = async (vehicleId: string) => {
    const query = new URLSearchParams({ vehicleId });
    const response: Vehicle = await getRequest(`http://localhost:3000/api/vehicle?${query}`);
    return response;
};

export  {
    getVehicles,
    getVehicle,
};