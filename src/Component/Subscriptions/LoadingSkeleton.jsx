import React from "react";
import { Grid, Card, CardContent, Stack, Skeleton } from "@mui/material";

const LoadingSkeleton = () => {
    return (
        <Grid container spacing={3}>
            {[1, 2, 3].map((item) => (
                <Grid item xs={12} md={4} key={item}>
                    <Card>
                        <CardContent>
                            <Stack spacing={2}>
                                <Skeleton variant="circular" width={56} height={56} />
                                <Skeleton variant="text" width="60%" height={32} />
                                <Skeleton variant="text" width="100%" />
                                <Skeleton variant="rectangular" height={48} />
                                <Skeleton variant="text" width="80%" />
                                <Skeleton variant="text" width="80%" />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default LoadingSkeleton;