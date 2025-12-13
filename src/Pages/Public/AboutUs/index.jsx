import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Avatar,
    Chip,
    Paper,
    List,
    Stack,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    CheckmarkCircle24Filled,
    Target24Regular,
    Lightbulb24Regular,
    People24Regular,
    Trophy24Regular,
    Rocket24Regular,
    Heart24Regular,
    Shield24Regular,
    Star24Filled,
    ArrowRight24Regular,
    Globe24Regular,
    BuildingRetail24Regular,
} from '@fluentui/react-icons';
import { ConsultantForm, FAQSection } from '../../../Component';

const AboutUsPage = () => {
    const theme = useTheme();

    const values = [
        {
            icon: <Lightbulb24Regular />,
            title: 'Innovation First',
            description: 'We push boundaries and embrace cutting-edge technology to deliver exceptional solutions.',
            color: theme.palette.warning.main,
        },
        {
            icon: <People24Regular />,
            title: 'Customer Focused',
            description: 'Your success is our success. We build lasting relationships through dedicated support.',
            color: theme.palette.primary.main,
        },
        {
            icon: <Shield24Regular />,
            title: 'Integrity & Trust',
            description: 'Transparency and honesty guide everything we do, building confidence with every interaction.',
            color: theme.palette.success.main,
        },
        {
            icon: <Rocket24Regular />,
            title: 'Excellence Driven',
            description: 'We strive for perfection in every project, continuously improving and innovating.',
            color: theme.palette.secondary.main,
        },
    ];

    const team = [
        {
            name: 'Sarah Johnson',
            role: 'CEO & Founder',
            image: 'https://i.pravatar.cc/150?img=5',
            bio: 'Visionary leader with 15+ years in tech innovation',
        },
        {
            name: 'Michael Chen',
            role: 'Chief Technology Officer',
            image: 'https://i.pravatar.cc/150?img=12',
            bio: 'AI expert and former Google engineer',
        },
        {
            name: 'Emily Rodriguez',
            role: 'Head of Design',
            image: 'https://i.pravatar.cc/150?img=9',
            bio: 'Award-winning UX designer passionate about user experience',
        },
        {
            name: 'David Kim',
            role: 'VP of Engineering',
            image: 'https://i.pravatar.cc/150?img=15',
            bio: 'Full-stack architect with a passion for scalable systems',
        },
        {
            name: 'Lisa Anderson',
            role: 'Chief Marketing Officer',
            image: 'https://i.pravatar.cc/150?img=10',
            bio: 'Brand strategist with expertise in digital marketing',
        },
        {
            name: 'James Wilson',
            role: 'Head of Customer Success',
            image: 'https://i.pravatar.cc/150?img=13',
            bio: 'Dedicated to ensuring every customer achieves their goals',
        },
    ];

    const milestones = [
        { year: '2019', title: 'Company Founded', description: 'BMG was born with a mission to revolutionize digital marketing' },
        { year: '2020', title: 'First 1000 Customers', description: 'Reached our first major milestone and expanded our team' },
        { year: '2021', title: 'AI Integration', description: 'Launched AI-powered tools that transformed the industry' },
        { year: '2022', title: 'Global Expansion', description: 'Opened offices in 5 countries across 3 continents' },
        { year: '2023', title: '1M+ Users', description: 'Celebrated serving over 1 million users worldwide' },
        { year: '2024', title: 'Industry Leader', description: 'Recognized as the #1 marketing automation platform' },
    ];

    const achievements = [
        { value: '10M+', label: 'Projects Completed' },
        { value: '50K+', label: 'Happy Clients' },
        { value: '99.9%', label: 'Uptime Guarantee' },
        { value: '24/7', label: 'Support Available' },
    ];

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', mt: 8 }}>
            <Box
                sx={{
                    backgroundColor: theme.palette.background.default,
                    py: { xs: 10, md: 0 },
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{ xs:12, md:6 }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: { xs: "2.2rem", md: "3.2rem" },
                                    color: theme.palette.text.primary,
                                    mb: 2,
                                    lineHeight: 1.15,
                                }}
                            >
                                BMG <br />
                                Your Partner in <br />
                                Digital Growth
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    maxWidth: 480,
                                    mb: 4,
                                    lineHeight: 1.6,
                                }}
                            >
                                We’ve helped countless businesses like yours overcome
                                fragmented efforts and achieve cohesive, high-impact
                                digital presence.
                            </Typography>

                            {/* Pagination Dots */}
                            <Stack direction="row" spacing={1}>
                                <Box
                                    sx={{
                                        width: 28,
                                        height: 8,
                                        borderRadius: 4,
                                        backgroundColor: theme.palette.primary.main,
                                    }}
                                />
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        backgroundColor: theme.palette.grey[400],
                                    }}
                                />
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        backgroundColor: theme.palette.grey[400],
                                    }}
                                />
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        backgroundColor: theme.palette.grey[400],
                                    }}
                                />
                            </Stack>
                        </Grid>
                        <Grid
                            size={{ xs:12, md:6 }}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: 2,
                            }}
                        >
                            {[
                                "https://i.pravatar.cc/150?img=5",
                                "https://i.pravatar.cc/150?img=12",
                                "https://i.pravatar.cc/150?img=9",
                            ].map((src, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        height: 460,
                                        borderRadius: 0,
                                        overflow: "hidden",
                                        boxShadow: 3,
                                    }}
                                >
                                    <img
                                        src={src}
                                        alt="hero"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>
                            ))}
                        </Grid>
                    </Grid>

                </Container>
                
                    <Box
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            py: 3,
                            px: 2,
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={4}
                            flexWrap="wrap"
                        >
                            <Typography
                                sx={{ fontWeight: 600, opacity: 0.9, mr: 2 }}
                            >
                                Trusted by
                            </Typography>

                            <Stack direction={{xs: 'column-reverse', md:"row" }}spacing={4} alignItems="center">
                                {["SmartFinder", "Zoomerr", "SHELLS", "WAVES", "ArtVenue"].map(
                                    (brand, i) => (
                                        <Box
                                            key={i}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                fontWeight: 600,
                                                opacity: 0.9,
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 28,
                                                    height: 28,
                                                    bgcolor: "#ffffff20",
                                                }}
                                            >
                                                ●
                                            </Avatar>
                                            {brand}
                                        </Box>
                                    )
                                )}
                            </Stack>
                        </Stack>
                    </Box>
            </Box>

            <Box
                sx={{
                    bgcolor: theme.palette.background.paper,
                    py: 6,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        {achievements.map((achievement, index) => (
                            <Grid size={{ xs:6, md:3 }} key={index}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 900,
                                            color: theme.palette.primary.main,
                                            mb: 1,
                                        }}
                                    >
                                        {achievement.value}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: 1,
                                        }}
                                    >
                                        {achievement.label}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                <Grid container spacing={6} alignItems="center">
                    <Grid size={{ xs:12, md:6 }}>
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: 4,
                                overflow: 'hidden',
                                boxShadow: `0 20px 60px ${theme.palette.primary.main}20`,
                            }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                                alt="Team collaboration"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid size={{ xs:12, md:6 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 3,
                                bgcolor: `${theme.palette.primary.main}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: theme.palette.primary.main,
                                mb: 3,
                            }}
                        >
                            <Target24Regular style={{ fontSize: 32 }} />
                        </Box>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                color: theme.palette.text.heading,
                                mb: 2,
                            }}
                        >
                            Our Mission
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.text.secondary,
                                mb: 3,
                                lineHeight: 1.8,
                                fontSize: '1.125rem',
                            }}
                        >
                            To empower businesses of all sizes with intelligent marketing automation that drives growth,
                            enhances customer engagement, and maximizes ROI. We believe in making advanced technology
                            accessible to everyone, democratizing the tools that were once available only to enterprise companies.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.text.secondary,
                                lineHeight: 1.8,
                                fontSize: '1.125rem',
                            }}
                        >
                            Through continuous innovation and unwavering commitment to customer success, we're building
                            the future of digital marketing—one campaign at a time.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            <Box
                sx={{
                    bgcolor: theme.palette.background.paper,
                    py: { xs: 8, md: 12 },
                    borderTop: `1px solid ${theme.palette.divider}`,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                color: theme.palette.text.heading,
                                mb: 2,
                            }}
                        >
                            Our Core Values
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.text.secondary,
                                maxWidth: 600,
                                mx: 'auto',
                            }}
                        >
                            The principles that guide every decision we make
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {values.map((value, index) => (
                            <Grid size={{ xs:12, sm:6, md:3 }} key={index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        p: 3,
                                        textAlign: 'center',
                                        bgcolor: theme.palette.accent.lightBlue,
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 3,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-12px)',
                                            boxShadow: `0 16px 40px ${value.color}20`,
                                            borderColor: value.color,
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 72,
                                            height: 72,
                                            borderRadius: '50%',
                                            bgcolor: `${value.color}15`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 3,
                                            color: value.color,
                                        }}
                                    >
                                        {value.icon}
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.text.heading,
                                            mb: 2,
                                        }}
                                    >
                                        {value.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {value.description}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            color: theme.palette.text.heading,
                            mb: 2,
                        }}
                    >
                        Our Journey
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.text.secondary,
                            maxWidth: 600,
                            mx: 'auto',
                        }}
                    >
                        From startup to industry leader
                    </Typography>
                </Box>

                <Box sx={{ position: 'relative' }}>
                    {/* Timeline Line */}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: { xs: 20, md: '50%' },
                            top: 0,
                            bottom: 0,
                            width: 3,
                            bgcolor: theme.palette.primary.main,
                            transform: { md: 'translateX(-50%)' },
                        }}
                    />

                    {/* Timeline Items */}
                    {milestones.map((milestone, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: 'relative',
                                mb: 6,
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: { xs: 'row', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    textAlign: { xs: 'left', md: index % 2 === 0 ? 'right' : 'left' },
                                    pr: { xs: 0, md: index % 2 === 0 ? 6 : 0 },
                                    pl: { xs: 5, md: index % 2 === 0 ? 0 : 6 },
                                }}
                            >
                                <Card
                                    sx={{
                                        p: 8,
                                        bgcolor: theme.palette.background.paper,
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 3,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: `0 8px 24px ${theme.palette.primary.main}20`,
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 800,
                                            color: theme.palette.primary.main,
                                            mb: 1,
                                        }}
                                    >
                                        {milestone.year}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.text.heading,
                                            mb: 1,
                                        }}
                                    >
                                        {milestone.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                        }}
                                    >
                                        {milestone.description}
                                    </Typography>
                                </Card>
                            </Box>

                            {/* Timeline Dot */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: { xs: 8, md: '50%' },
                                    transform: { md: 'translateX(-50%)' },
                                    width: 28,
                                    height: 28,
                                    borderRadius: '50%',
                                    bgcolor: theme.palette.primary.main,
                                    border: `4px solid ${theme.palette.background.default}`,
                                    boxShadow: `0 0 0 4px ${theme.palette.primary.main}30`,
                                    zIndex: 1,
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>

            <Box
                sx={{
                    bgcolor: theme.palette.background.paper,
                    py: { xs: 8, md: 12 },
                    borderTop: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                color: theme.palette.text.heading,
                                mb: 2,
                            }}
                        >
                            Meet Our Team
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.text.secondary,
                                maxWidth: 600,
                                mx: 'auto',
                            }}
                        >
                            The brilliant minds behind BMG's success
                        </Typography>
                    </Box>
                    <Grid container spacing={4}>
                        {team.map((member, index) => (
                            <Grid size={{ xs:12, sm:6, md:4 }} key={index}>
                                <Card
                                    sx={{
                                        textAlign: 'center',
                                        p: 4,
                                        bgcolor: theme.palette.background.default,
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 3,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: `0 12px 32px ${theme.palette.primary.main}20`,
                                            '& .avatar': {
                                                transform: 'scale(1.1)',
                                            },
                                        },
                                    }}
                                >
                                    <Avatar
                                        src={member.image}
                                        className="avatar"
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            mx: 'auto',
                                            mb: 2,
                                            border: `4px solid ${theme.palette.primary.main}`,
                                            transition: 'transform 0.3s ease',
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.text.heading,
                                            mb: 0.5,
                                        }}
                                    >
                                        {member.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontWeight: 600,
                                            mb: 2,
                                        }}
                                    >
                                        {member.role}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {member.bio}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
           <ConsultantForm />
           <FAQSection/>
        </Box>
    );
};

export default AboutUsPage;