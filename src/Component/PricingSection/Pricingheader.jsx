import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PricingHeader = () => {
    const theme = useTheme();

    return (
        <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip
                label="PRICING PLANS"
                sx={{
                    bgcolor: `${theme.palette.primary.main}15`,
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    mb: 2,
                    px: 2,
                }}
            />
            <Typography
                variant="h2"
                sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    color: theme.palette.text.heading,
                    mb: 2,
                    lineHeight: 1.2,
                }}
            >
                Choose Your Perfect Plan
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    color: theme.palette.text.secondary,
                    mb: 4,
                    maxWidth: 600,
                    mx: 'auto',
                    fontWeight: 400,
                }}
            >
                Purchase credits for AI-powered services. All credits are instantly activated and never expire.
            </Typography>
        </Box>
    );
};

export default PricingHeader;