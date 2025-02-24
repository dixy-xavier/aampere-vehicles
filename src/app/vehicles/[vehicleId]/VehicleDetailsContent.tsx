import { KEY_STRINGS } from '@/utils/contants';
import { Grid2, Typography } from '@mui/material';


const VehicleDetailsContent = ({ titleKey, value }: { titleKey: keyof typeof KEY_STRINGS; value: string }) => {
    const textValue = typeof value === 'boolean' ? value ? 'Yes' : 'No' : value;
    return (
        <Grid2 container spacing={1} sx={{ py: 1 }}>
            <Grid2 size={6}>
                <Typography sx={{ pr: 1, fontWeight: 'bold' }}>{KEY_STRINGS[titleKey]}</Typography>
            </Grid2>
            <Grid2 size={6}>
                <Typography>{textValue}</Typography>
            </Grid2>
        </Grid2>
    );
};

export default VehicleDetailsContent;