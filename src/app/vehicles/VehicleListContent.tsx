import { VehicleListContentProps } from "@/types";
import { Box, Button, Input } from "@mui/material";
import VehicleListTableLayout from "./VehicleListTableLayout";

const VehicleListContent: React.FC<VehicleListContentProps> = ({
    vehicles,
    loading,
    handleFilterChange,
    toggleSort,
    sort,
    loadPrevious,
    loadMore,
}) => {
    const hasVehicles = !loading && Array.isArray(vehicles) && vehicles.length > 0;

    return (
        <Box>
            <Input
                type="text"
                placeholder="Filter by brand or model"
                onChange={handleFilterChange}
                fullWidth
            />
            {hasVehicles && (
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Button onClick={toggleSort}>{sort ? 'Unsort' : 'Sort by brand'}</Button>
                </Box>
            )}
            <VehicleListTableLayout vehicles={vehicles} />
            {hasVehicles && (
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button onClick={loadPrevious}>Load previous</Button>
                    <Button onClick={loadMore}>Load more</Button>
                </Box>
            )}
        </Box>
    );
};

export default VehicleListContent;