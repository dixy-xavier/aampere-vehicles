'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getVehicle } from "@/utils/services";
import { Vehicle, vehicleInitialState } from "@/types";

const VehiclePage = () => {
    const [vehicle, setVehicle] = useState<Vehicle>(vehicleInitialState);
    const params = useParams();
    const vehicleId = params?.vehicleId as string;

    useEffect(() => {
        const fetchVehicle = async () => {
            const response = await getVehicle(vehicleId);
            setVehicle(response);
        };

        fetchVehicle();
    }, [vehicleId]);

    return (
        <div>
            <h1>Vehicle ID: {vehicleId}</h1>
            <div>Brand: {vehicle.brand}</div>
            <div>Model: {vehicle.model}</div>
            <div>Year: {vehicle.year}</div>
            <div>Price: {vehicle.price}</div>
            <div>Range: {vehicle.range}</div>
            <div>Color: {vehicle.color}</div>
            <div>Condition: {vehicle.condition}</div>
            <div>Battery Capacity: {vehicle.battery_capacity_kWh}</div>
            <div>Charging Speed: {vehicle.charging_speed_kW}</div>
            <div>Seats: {vehicle.seats}</div>
            <div>Drivet Rain: {vehicle.drivetrain}</div>
            <div>Location: {vehicle.location}</div>
            <div>Autopilot: {vehicle.autopilot}</div>
            <div>Kilometer: {vehicle.kilometer_count}</div>
            <div>Accidents: {vehicle.accidents ? 'yes' : 'no'}</div>
            {vehicle.accident_description ? <div>Brand: {vehicle.accident_description}</div> : null}
        </div>
    );
};

export default VehiclePage;