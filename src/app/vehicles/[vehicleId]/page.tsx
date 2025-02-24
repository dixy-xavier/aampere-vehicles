'use client';
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { getVehicle } from "@/utils/services";
import { Vehicle, vehicleInitialState } from "@/types";
import { Box, Breadcrumbs, Card, CardContent, CardHeader, Container, Grid2, ImageList, ImageListItem, Link, Skeleton, Typography } from "@mui/material";
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
                    <Breadcrumbs aria-label="breadcrumb" sx={{ p: 2 }}>
                        <Link underline="hover" color="inherit" href="/vehicles">
                            Go back to vehicle list
                        </Link>
                    </Breadcrumbs>
                    <CardHeader title="Vehicle Details" />
                    <CardContent>
                        <Grid2 container spacing={2}>
                            <Grid2 size={8}>
                                {vehicle.images.length === 0 ? (
                                    <Skeleton variant="rectangular" height={700} />
                                ) : (
                                    <ImageList sx={{ height: 700 }} cols={3} rowHeight={164}>
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