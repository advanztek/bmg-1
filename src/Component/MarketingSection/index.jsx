import React from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    Stack,
    useTheme
} from '@mui/material';

import {
    CheckmarkCircle24Regular,
    VideoClip24Regular,
    ShoppingBag24Regular,
    People24Regular,
    Phone24Regular,
    Chat24Regular,
    Target24Regular
} from '@fluentui/react-icons';
import { FONT_FAMILY } from '../../Config/font';
import { useNavigate } from 'react-router-dom';

const HeroMarketingSection = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                background: theme.palette.primary.light,
                minHeight: '500px',
                py: { xs: 6, md: 8 },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(
                        circle at 20% 50%,
                        ${theme.palette.accent.blue}20 0%,
                        transparent 50%
                    )`
                }
            }}
        >
            <Container maxWidth="lg">
                <Box
                data-aos='fade-up'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 6, md: 4 },
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    <Box sx={{ flex: '1 1 400px', maxWidth: { xs: '100%', md: '600px' } }}>
                        <Typography
                            variant="h2"
                            sx={{
                                color: theme.palette.text.contrastText || '#fff',
                                fontWeight: 800,
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                                lineHeight: 1.2,
                                mb: 3,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            Business Done fast!
                            <br />
                            <Box component="span" sx={{ color: theme.palette.warning.main }}>
                                48-72hrs
                            </Box>{" "}
                            Order Deliver
                        </Typography>

                        <Typography
                            sx={{
                                color: theme.palette.secondary.contrastText,
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                fontFamily: FONT_FAMILY.tertiary,
                                mb: 4,
                                lineHeight: 1.6
                            }}
                        >
                            Bite-sized digital marketing services to sell more, acquire
                            customers and grow your business.
                        </Typography>

                        <Stack spacing={2} sx={{ color: theme.palette.primary.contrastText, mb: 4 }}>
                            {[
                                'Interdum volutpat turpis malesuada ac turpis.',
                                'Tortor ipsum pretium quis nunc.',
                                'Vitae odio a id purus in.'
                            ].map((text, index) => (
                                <Box
                                    key={index}
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
                                >
                                    <CheckmarkCircle24Regular
                                        style={{ color: theme.palette.primary.contrastText, flexShrink: 0 }}
                                    />
                                    <Typography sx={{ fontFamily: FONT_FAMILY.primary, color: theme.palette.secondary.contrastText, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                                        {text}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>

                        <Button
                            onClick={() => navigate('/login')}
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: 'transparent',
                                border: `2px solid ${theme.palette.secondary.contrastText}`,
                                color: theme.palette.secondary.contrastText,
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: theme.palette.secondary.contrastText,
                                    color: theme.palette.primary.dark,
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Explore BMG
                        </Button>
                    </Box>

                    {/* Right Content - Responsive Browser Mockups */}
                    <Box
                        sx={{
                            flex: '1 1 400px',
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: { xs: '350px', sm: '400px' },
                            width: { xs: '100%', md: 'auto' },
                            maxWidth: { xs: '100%', sm: '500px' }
                        }}
                    >
                        {/* BACK GRADIENT CARD - Hidden on xs */}
                        <Box
                            sx={{
                                position: 'absolute',
                                width: { xs: '90%', sm: '420px', md: '520px' },
                                height: { xs: '180px', sm: '200px', md: '220px' },
                                background: `linear-gradient(
                                    135deg,
                                    ${theme.palette.error.main} 0%,
                                    ${theme.palette.warning.main} 25%,
                                    ${theme.palette.success.main} 50%,
                                    ${theme.palette.info.main} 75%,
                                    ${theme.palette.primary.main} 100%
                                )`,
                                borderRadius: '20px',
                                transform: { xs: 'rotate(-3deg)', md: 'rotate(-5deg)' },
                                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                display: { xs: 'none', sm: 'block' }
                            }}
                        />

                        {/* MAIN BROWSER CARD */}
                        <Box
                            sx={{
                                position: 'relative',
                                width: { xs: '100%', sm: '340px', md: '380px' },
                                bgcolor: theme.palette.background.paper,
                                borderRadius: '16px',
                                p: { xs: 2, sm: 2.5, md: 3 },
                                boxShadow: theme.shadows[10],
                                zIndex: 2
                            }}
                        >
                            {/* BROWSER COLOR DOTS */}
                            <Box sx={{ display: 'flex', gap: 0.8, mb: 2 }}>
                                <Box
                                    sx={{
                                        width: { xs: 8, md: 10 },
                                        height: { xs: 8, md: 10 },
                                        borderRadius: '50%',
                                        bgcolor: theme.palette.error.main
                                    }}
                                />
                                <Box
                                    sx={{
                                        width: { xs: 8, md: 10 },
                                        height: { xs: 8, md: 10 },
                                        borderRadius: '50%',
                                        bgcolor: theme.palette.warning.main
                                    }}
                                />
                                <Box
                                    sx={{
                                        width: { xs: 8, md: 10 },
                                        height: { xs: 8, md: 10 },
                                        borderRadius: '50%',
                                        bgcolor: theme.palette.success.main
                                    }}
                                />
                            </Box>

                            {/* VIDEO AREA */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    borderRadius: '12px',
                                    height: { xs: '140px', sm: '150px', md: '160px' },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 2,
                                    overflow: 'hidden',
                                    background: `linear-gradient(
                                        135deg,
                                        ${theme.palette.primary.light} 0%,
                                        ${theme.palette.primary.main} 100%
                                    )`
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: 60, md: 70 },
                                        height: { xs: 60, md: 70 },
                                        borderRadius: '50%',
                                        bgcolor: theme.palette.background.paper,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                        cursor: 'pointer',
                                        transition: '0.2s',
                                        '&:hover': { transform: 'scale(1.1)' }
                                    }}
                                >
                                    <VideoClip24Regular
                                        style={{ color: theme.palette.primary.main, fontSize: 32 }}
                                    />
                                </Box>

                                {/* Corner Icons */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: { xs: 8, md: 10 },
                                        left: { xs: 8, md: 10 },
                                        bgcolor: theme.palette.error.main,
                                        p: { xs: 0.75, md: 1 },
                                        borderRadius: '8px'
                                    }}
                                >
                                    <ShoppingBag24Regular style={{ color: '#fff', fontSize: 20 }} />
                                </Box>

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: { xs: 8, md: 10 },
                                        left: { xs: 8, md: 10 },
                                        bgcolor: theme.palette.info.main,
                                        p: { xs: 0.75, md: 1 },
                                        borderRadius: '8px'
                                    }}
                                >
                                    <Phone24Regular style={{ color: '#fff', fontSize: 20 }} />
                                </Box>

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: { xs: 8, md: 10 },
                                        right: { xs: 8, md: 10 },
                                        bgcolor: theme.palette.warning.main,
                                        p: { xs: 0.75, md: 1 },
                                        borderRadius: '8px'
                                    }}
                                >
                                    <People24Regular style={{ color: '#fff', fontSize: 20 }} />
                                </Box>

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: { xs: 8, md: 10 },
                                        right: { xs: 8, md: 10 },
                                        bgcolor: theme.palette.success.main,
                                        p: { xs: 0.75, md: 1 },
                                        borderRadius: '8px'
                                    }}
                                >
                                    <Chat24Regular style={{ color: '#fff', fontSize: 20 }} />
                                </Box>
                            </Box>

                            {/* BOTTOM ICON ROW */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: { xs: 0.5, md: 1 } }}>
                                {[
                                    { icon: <Target24Regular />, color: theme.palette.info.main },
                                    { icon: <ShoppingBag24Regular />, color: theme.palette.error.main },
                                    { icon: <People24Regular />, color: theme.palette.success.main },
                                    { icon: <Chat24Regular />, color: theme.palette.warning.main }
                                ].map((item, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: { xs: 44, sm: 48, md: 50 },
                                            height: { xs: 44, sm: 48, md: 50 },
                                            bgcolor: theme.palette.background.default,
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: item.color,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                bgcolor: item.color,
                                                color: '#fff',
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
                                            }
                                        }}
                                    >
                                        {item.icon}
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        {/* SIDE BROWSER CARD - Hidden on mobile */}
                        <Box
                            sx={{
                                position: 'absolute',
                                right: { sm: -20, md: -20 },
                                top: { sm: 20, md: 20 },
                                width: { sm: '240px', md: '280px' },
                                height: { sm: '160px', md: '180px' },
                                bgcolor: theme.palette.background.glass,
                                borderRadius: '16px',
                                boxShadow: theme.shadows[8],
                                zIndex: 1,
                                p: 2,
                                display: { xs: 'none', sm: 'flex' },
                                flexDirection: 'column',
                                gap: 1
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: 0.8, mb: 1 }}>
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: theme.palette.error.main }} />
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: theme.palette.warning.main }} />
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: theme.palette.success.main }} />
                            </Box>

                            <Box sx={{ height: 8, bgcolor: theme.palette.divider, borderRadius: 1, width: '80%' }} />
                            <Box sx={{ height: 8, bgcolor: theme.palette.divider, borderRadius: 1, width: '60%' }} />

                            <Box sx={{ height: { sm: 50, md: 60 }, bgcolor: theme.palette.accent.gray, borderRadius: 2, mt: 1 }} />

                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Box sx={{ height: 8, bgcolor: theme.palette.divider, borderRadius: 1, flex: 1 }} />
                                <Box sx={{ height: 8, bgcolor: theme.palette.divider, borderRadius: 1, flex: 1 }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HeroMarketingSection;