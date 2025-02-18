const VehiclePage = async ({ params }: { params: { vehicleId: string } }) => {
    // const router = useRouter();
    const { vehicleId } = await params;

    return (
        <div>
            <h1>Vehicle ID: {vehicleId}</h1>
        </div>
    );
};

export default VehiclePage;