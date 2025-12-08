import React from 'react';
import {
    Box,
    Grid,
    Button,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Checkmark24Filled } from '@fluentui/react-icons';
import { AuthSlider } from '../../../../Component';
import { useNavigate } from 'react-router-dom';

const PasswordResetSuccessPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: theme.palette.background.default,
                display: 'flex',
                overflow: 'hidden',
            }}
        >
            <Grid
                container
                sx={{
                    minHeight: '100vh',
                    margin: 0,
                    width: '100%',
                }}
            >
                <Grid
                    size={{ xs: 12, md: 7 }}
                    sx={{
                        bgcolor: theme.palette.primary.light,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: { xs: 4, md: 7 },
                    }}
                >
                    <AuthSlider />
                </Grid>

                <Grid
                    size={{ xs: 12, md: 5 }}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        px: { xs: 4, md: 6 },
                        bgcolor: theme.palette.background.default,
                    }}
                >
                    <Box sx={{ maxWidth: 450, width: '100%', textAlign: 'center' }}>

                        {/* Success Icon */}
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                backgroundColor: `${theme.palette.success.main}20`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px',
                            }}
                        >
                            <Checkmark24Filled
                                style={{
                                    fontSize: '48px',
                                    color: theme.palette.success.main,
                                }}
                            />
                        </Box>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                                fontSize: { xs: '1.5rem', md: '1.75rem' },
                                color: theme.palette.text.heading,
                            }}
                        >
                            Password Reset Successful!
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                mb: 4,
                                color: theme.palette.text.secondary,
                                fontSize: '0.95rem',
                                lineHeight: 1.6,
                                px: 2,
                            }}
                        >
                            Your password has been successfully reset. You can now log in with your new password.
                        </Typography>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleBackToLogin}
                            sx={{
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.bg,
                                },
                            }}
                        >
                            BACK TO LOGIN
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PasswordResetSuccessPage;