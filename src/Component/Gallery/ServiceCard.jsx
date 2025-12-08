import { Box, Typography } from "@mui/material";
import { cardStyle } from "./style";

export default function ServiceCard({ logo, bg = "#0f0f0f" }) {

    return (
        <Box
            sx={{
                ...cardStyle,
                backgroundColor: bg,
                color: bg === "#0f0f0f" ? "white" : "black",
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                component="img"
                src={logo}
                sx={{ width: 120, mb: 2 }}
            />
            <Typography variant="body1">EMERICS WOOD SERVICES</Typography>
        </Box>
    );
}
