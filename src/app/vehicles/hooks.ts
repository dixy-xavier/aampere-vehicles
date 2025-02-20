import { Vehicle } from "@/types";
import { LIMIT } from "@/utils/contants";
import { debounce } from "@/utils/general";
import { getVehicles } from "@/utils/services";
import { useCallback, useEffect, useMemo, useState } from "react";

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

    return useMemo(() => ({ ...state, fetchVehicles }), [state, fetchVehicles]);
};

export const useVehicleListActions = (
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setSort: React.Dispatch<React.SetStateAction<boolean>>,
    setFilterText: React.Dispatch<React.SetStateAction<string>>,
    totalPages: number,
    vehicles: Vehicle[]
) => {
    const toggleSort = useCallback(() => {
        setSort(prevSort => !prevSort);
    }, [setSort]);

    const debounceFilter = useMemo(() => debounce((filterText: string) => {
        setPage(1);
        setFilterText(filterText);
    }, 300), [setPage, setFilterText]);

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

    return { toggleSort, debounceFilter, loadPrevious, loadMore };
};
