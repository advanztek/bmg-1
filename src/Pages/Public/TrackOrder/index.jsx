import React from 'react'
import { Box } from '@mui/material'
import { BreadcrumbBar, OrderTracker, } from '../../../Component'
import { Home24Regular } from '@fluentui/react-icons'

const TrackOrderPage = () => {
    return (
        <>
            <Box sx={{ pt: 8 }}>
                <BreadcrumbBar
                    breadcrumbs={[
                        { label: "Home", href: "/", icon: <Home24Regular /> },
                        { label: "Category", href: "#" },
                        { label: "Design", href: "#" },
                    ]}
                    suggestions={[
                        "AI Logo Maker",
                        "Video Editing",
                        "Website Development",
                        "Branding",
                    ]}
                    onSearch={(value) => console.log("Search Input:", value)}
                />
                <OrderTracker />
            </Box>
        </>
    )
}

export default TrackOrderPage
