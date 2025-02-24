import { VehicleListContentProps } from "@/types";
import { Box, Button } from "@mui/material";
import VehicleListTableLayout from "./VehicleListTableLayout";

const VehicleListContent: React.FC<VehicleListContentProps> = ({
    vehicles,
    loading,
    loadPrevious,
    loadMore,
    sortBy,
}) => {
    const hasVehicles = !loading && Array.isArray(vehicles) && vehicles.length > 0;

    return (
        <Box>
            <VehicleListTableLayout vehicles={vehicles} sortBy={sortBy} />
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