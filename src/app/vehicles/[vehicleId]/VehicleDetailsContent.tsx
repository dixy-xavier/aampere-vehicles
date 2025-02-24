import { KEY_STRINGS } from '@/utils/constants';
import { Grid2, Typography } from '@mui/material';

const VehicleDetailsContent = ({ titleKey, value }: { titleKey: keyof typeof KEY_STRINGS; value: string | boolean }) => {
    const textValue = value === true ? 'Yes' : value === false ? 'No' : value;
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