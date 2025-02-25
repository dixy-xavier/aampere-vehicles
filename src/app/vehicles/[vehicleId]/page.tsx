'use client';
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { getVehicle } from "@/utils/services";
import { Vehicle, vehicleInitialState } from "@/types";
import { Box, Breadcrumbs, Card, CardContent, CardHeader, Container, Grid2, Link, Skeleton } from "@mui/material";
import VehicleDetailsContent from "./VehicleDetailsContent";
import { KEY_STRINGS } from "@/utils/constants";
import Carousel from "@/components/Carousel";

const VehiclePage = () => {
    const [vehicle, setVehicle] = useState<Vehicle>(vehicleInitialState);
    const params = useParams();
    const vehicleId = params?.vehicleId as string;

    const fetchVehicle = useCallback(async () => {
        const response = await getVehicle(vehicleId);
        setVehicle(response);
    }, [vehicleId]);

    useEffect(() => {
        fetchVehicle();
    }, [fetchVehicle]);

    return (
        <Container sx={{ height: "100%" }}>
            <Box display="flex" justifyContent="center" height="100%"> 
                <Card sx={{ width: "100%" }}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ p: 2 }}>
                        <Link underline="hover" color="inherit" href="/vehicles">
                            Go back to vehicle list
                        </Link>
                    </Breadcrumbs>
                    <CardHeader title="Vehicle Details" />
                    <CardContent className="vehicle-details-card-container">
                        <Grid2 container spacing={2} className="vehicle-details-container">
                            <Grid2 size={8} data-testid="vehicle-images" className="vehicle-details-image-container">
                                {vehicle.images.length === 0 ? (
                                    <Skeleton variant="rectangular" height={700} />
                                ) : (
                                    <Carousel images={vehicle.images} />
                                )}
                            </Grid2>
                            <Grid2 size={4} data-testid="vehicle-details" className="vehicle-details">
                                {vehicle.id === '' ? (
                                    <Skeleton variant="rounded" height={700} />
                                ) : (
                                    <Card>
                                        <CardContent>
                                                {Object.entries(vehicle)
                                                    .filter(([key]) => key !== 'id' && key !== 'images')
                                                    .map(([key, value]) => <VehicleDetailsContent key={key} titleKey={key as keyof typeof KEY_STRINGS} value={value} />)}
                                        </CardContent>
                                    </Card>
                                )}
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default VehiclePage;