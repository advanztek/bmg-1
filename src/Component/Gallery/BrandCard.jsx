import { Box, Typography } from "@mui/material";
import { cardStyle } from "./style";

export default function BrandCard({ logo }) {
    return (
        <Box sx={{ ...cardStyle, textAlign: "center" }}>
            <Box
                component="img"
                src={logo}
                sx={{ width: "100%", objectFit: "contain", pb: 1 }}
            />
            <Typography variant="subtitle1" fontWeight={700}>
                Brand Label
            </Typography>
        </Box>
    );
}
