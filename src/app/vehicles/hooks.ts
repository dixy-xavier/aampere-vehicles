import { Vehicle } from "@/types";
import { LIMIT } from "@/utils/contants";
import { getVehicles } from "@/utils/services";
import { useCallback, useEffect, useState } from "react";

export const useVehicles = (page: number, sort: boolean, filterText: string) => {
    const [state, setState] = useState({
        vehicles: [] as Vehicle[],
        totalPages: 0,
        loading: true,
    });

    const fetchVehicles = useCallback(async () => {
        setState(prevState => ({ ...prevState, loading: true }));
        const vehiclesData: { count: number; data: Vehicle[] } = await getVehicles({ page, sort, filter: filterText });
        setState({
            vehicles: vehiclesData.data,
            totalPages: Math.ceil(vehiclesData.count / LIMIT),
            loading: false,
        });
    }, [page, sort, filterText]);

    useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles]);

    return { ...state, fetchVehicles };
};

