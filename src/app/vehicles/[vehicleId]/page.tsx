'use client';
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { getVehicle } from "@/utils/services";
import { Vehicle, vehicleInitialState } from "@/types";
import { Box, Card, CardContent, CardHeader, Container, Grid2, ImageList, ImageListItem, Typography } from "@mui/material";
import VehicleDetailsContent from "./VehicleDetailsContent";
import { KEY_STRINGS } from "@/utils/constants";

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
                    <CardHeader title="Vehicle Details" />
                    <CardContent>
                        <Grid2 container spacing={2}>
                            <Grid2 size={8}>
                                {vehicle.images.length === 0 ? (
                                    <Box display="flex" alignItems="center" height="100%">
                                        <Typography>Loading vehicle images...</Typography>
                                    </Box>
                                ) : (
                                    <ImageList sx={{ width: 700, height: 700 }} cols={3} rowHeight={164}>
                                        {vehicle.images.map((img, index) => (
                                            <ImageListItem key={img}>
                                                <img
                                                    srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                    src={`${img}?w=164&h=164&fit=crop&auto=format`}
                                                    alt={`${vehicle.id}-${index}`}
                                                    loading="lazy"
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                )}
                            </Grid2>
                            <Grid2 size={4}>
                                <Card>
                                    <CardContent>
                                        {vehicle.id === '' ? (
                                            <Box display="flex" alignItems="center" height="100%">
                                                <Typography>Loading vehicle details...</Typography>
                                            </Box>
                                        ) : (
                                            Object.entries(vehicle)
                                                .filter(([key]) => key !== 'id' && key !== 'images')
                                                .map(([key, value]) => <VehicleDetailsContent key={key} titleKey={key as keyof typeof KEY_STRINGS} value={value} />)
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default VehiclePage;