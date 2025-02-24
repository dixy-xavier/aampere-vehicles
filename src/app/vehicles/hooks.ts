import { Vehicle } from "@/types";
import { LIMIT } from "@/utils/constants";
import { debounce } from "@/utils/general";
import { getVehicles } from "@/utils/services";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useVehicles = (page: number, sortKey: string, filterText: string) => {
    const [state, setState] = useState({
        vehicles: [] as Vehicle[],
        totalPages: 0,
        loading: true,
    });

    const fetchVehicles = useCallback(async () => {
        setState(prevState => ({ ...prevState, loading: true }));
        const vehiclesData: { count: number; data: Vehicle[] } = await getVehicles({ page, sortKey, filter: filterText });
        setState({
            vehicles: vehiclesData.data,
            totalPages: Math.ceil(vehiclesData.count / LIMIT),
            loading: false,
        });
    }, [page, sortKey, filterText]);

    useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles]);

    return useMemo(() => ({ ...state, fetchVehicles }), [state, fetchVehicles]);
};

export const useVehicleListActions = (
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number,
    vehicles: Vehicle[]
) => {
    const debounceFilter = useMemo(() => debounce(() => {
        setPage(1);
    }, 300), [setPage]);

    const loadPrevious = useCallback(() => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    }, [page, setPage]);

    const loadMore = useCallback(() => {
        if (page < totalPages && vehicles.length >= LIMIT) {
            setPage(prevPage => prevPage + 1);
        }
    }, [page, totalPages, vehicles.length, setPage]);

    return { debounceFilter, loadPrevious, loadMore };
};
