import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Container,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useTheme,
} from '@mui/material';

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeroSection } from '../Herosection';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleToggle = () => {
        setMobileOpen((prev) => !prev);
    };

    const menuItems = [
        { label: 'Gigs', path: '/category' },
        { label: 'Services', path: '/service' },
        { label: 'Portfolio', path: '/portfolio' },
        { label: 'Resources', path: '/resources' },
        { label: 'Blogs', path: '/blogs' },
        { label: 'Gift Voucher', path: '/gift-voucher' }
    ];

    const handleGetStarted = () => {
        navigate('/register');
    }

    return (
        <Box>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: 0
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ py: 1, display: "flex", justifyContent: "space-between" }}>

                        {/* LOGO */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                component="img"
                                alt="Logo"
                                src="/Logo/Logo.png"
                                sx={{
                                    width: '80px',
                                    height: '100%',
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>

                        {/* DESKTOP MENU */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, ml: 4 }}>
                            {menuItems.map((item) => (
                                <Box
                                    key={item.path}
                                    component={Link}
                                    to={item.path}
                                    sx={{
                                        textDecoration: "none",
                                        color: theme.palette.text.primary,
                                        fontWeight: 500,
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        transition: "0.2s",
                                        '&:hover': {
                                            fontWeight: 700,
                                            color: theme.palette.primary.dark
                                        }
                                    }}
                                >
                                    {item.label}
                                </Box>
                            ))}
                        </Box>

                        {/* CONTACT + CTA BUTTON (Desktop Only) */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                            <Button
                                startIcon={<img src='/Icons/icons_1.png' style={{ width: '100%' }} />}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    color: theme.palette.text.primary
                                }}
                            >
                                +2349008709
                            </Button>

                            <Button
                                onClick={handleGetStarted}
                                variant="contained"
                                sx={{
                                    backgroundColor: theme.palette.warning.light,
                                    color: theme.palette.warning.contrastText,
                                    px: 3,
                                    py: 1.2,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    boxShadow: 'none',
                                    '&:hover': {
                                        backgroundColor: theme.palette.warning.main,
                                        boxShadow: `0 4px 12px ${theme.palette.warning.main}55`
                                    }
                                }}
                            >
                                Get Started
                            </Button>
                        </Box>

                        {/* MOBILE MENU ICON */}
                        <IconButton
                            onClick={handleToggle}
                            sx={{ display: { xs: 'flex', md: 'none' } }}
                        >
                            <MenuIcon sx={{ fontSize: 30, color: theme.palette.text.primary }} />
                        </IconButton>

                    </Toolbar>
                </Container>
            </AppBar>

            {/* MOBILE DRAWER */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleToggle}
                PaperProps={{
                    sx: {
                        width: 260,
                        backgroundColor: theme.palette.background.default
                    }
                }}
            >
                {/* Drawer Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                    <Box
                        component="img"
                        src="/Logo/Logo.png"
                        sx={{ width: 70 }}
                    />
                    <IconButton onClick={handleToggle}>
                        <CloseIcon sx={{ color: theme.palette.text.primary }} />
                    </IconButton>
                </Box>

                {/* Menu Items */}
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                onClick={handleToggle}
                            >
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontSize: "1rem",
                                        fontWeight: 500,
                                        color: theme.palette.text.primary
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                {/* CONTACT + CTA (Mobile) */}
                <Box px={2} mt={2}>
                    <Button
                        fullWidth
                        startIcon={<img src='/Icons/icons_1.png' style={{ width: 20 }} />}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                            mb: 2
                        }}
                    >
                        +2349008709
                    </Button>

                    <Button
                        onClick={handleGetStarted}
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: theme.palette.warning.light,
                            color: theme.palette.warning.contrastText,
                            py: 1.3,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                        }}
                    >
                        Get Started
                    </Button>
                </Box>
            </Drawer>

            {isHomePage && <HeroSection />}
        </Box>
    );
};

export default Header;
