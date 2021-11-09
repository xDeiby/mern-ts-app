import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

export default function Spinner() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
}
