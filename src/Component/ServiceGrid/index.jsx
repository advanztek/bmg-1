// ServicesGrid.jsx
import React, { useState } from "react";
import {
    CheckmarkCircle24Filled,
    ArrowCircleDown24Filled
} from "@fluentui/react-icons";

import {
    Box,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Chip,
    Stack,
    Typography,
    Button,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Pagination,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 8;

export default function ServicesGrid({ data }) {
    const theme = useTheme();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    return (
        <Box sx={{ width: "100%", py: 6, background: theme.palette.background.default }}>
            <Container maxWidth="lg">

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                        Explore Graphic Design Services
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Popular services people are buying right now!
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {paginatedItems.map((card) => (
                        <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Card
                                elevation={4}
                                sx={{
                                    borderRadius: 4,
                                    height: "auto",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                    transition: "0.25s ease",
                                    background: theme.palette.background.paper,
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow: theme.shadows[10],
                                    },
                                }}
                            >
                                <Box sx={{ position: "relative" }}>
                                    <CardMedia
                                        component="img"
                                        image={card.image}
                                        sx={{
                                            height: 160,
                                            objectFit: "cover",
                                        }}
                                    />

                                    {card.discount && (
                                        <Chip
                                            label={card.discount}
                                            size="small"
                                            sx={{
                                                position: "absolute",
                                                top: 10,
                                                left: 10,
                                                bgcolor: theme.palette.primary.dark,
                                                color: theme.palette.primary.contrastText,
                                                fontWeight: 700,
                                                borderRadius: 2,
                                            }}
                                        />
                                    )}
                                </Box>

                                <CardContent sx={{ flex: "1 1 auto", pb: 1 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                                        {card.title}
                                    </Typography>

                                    <Typography sx={{ fontWeight: 600 }} variant="caption" color="text.secondary">
                                        {card.subtitle}
                                    </Typography>

                                    <Stack direction="row" justifyContent="space-between" mt={1}>
                                        <Typography variant="h6" sx={{ fontWeight: 800, color: theme.palette.success.main }}>
                                            {card.price}
                                        </Typography>

                                        {card.oldPrice && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    textDecoration: "line-through",
                                                    color: theme.palette.text.disabled,
                                                }}
                                            >
                                                {card.oldPrice}
                                            </Typography>
                                        )}
                                    </Stack>

                                    <Divider sx={{ my: 1.5 }} />
                                    <List dense disablePadding>
                                        {[...card.features, "Fast delivery", "Editable files", "100% satisfaction"]
                                            .slice(0, 6)
                                            .map((feature, index) => (
                                                <ListItem key={index} sx={{ px: 0, py: 0.4 }}>
                                                    <ListItemIcon sx={{ minWidth: 30 }}>
                                                        <CheckmarkCircle24Filled
                                                            style={{
                                                                color: theme.palette.success.main,
                                                                background: theme.palette.success.light + "33",
                                                                borderRadius: "50%",
                                                            }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                                {feature}
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                            ))}
                                    </List>
                                </CardContent>
                                <CardActions sx={{ pb: 2, px: 2 }}>
                                    <Button
                                        onClick={() =>
                                            navigate(`/service/${encodeURIComponent(card.title)}`)
                                        }
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: 700,
                                            borderRadius: 2,
                                            py: 1.1,
                                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                            "&:hover": {
                                                background: `linear-gradient(90deg, ${theme.palette.primary.bg}, ${theme.palette.primary.main})`,
                                            },
                                        }}
                                    >
                                        Start Now
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(e, val) => setPage(val)}
                        size="large"
                        sx={{
                            "& .MuiPaginationItem-root": {
                                fontWeight: 700,
                                "&.Mui-selected": {
                                    background: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                },
                            },
                        }}
                    />
                </Box>
            </Container>
        </Box>
    );
}
