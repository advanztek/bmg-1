import React from 'react'
import { Box } from '@mui/material'
import { BreadcrumbBar, AIServicesShowcase, ConsultantForm, CategoryBanner, ServicesGrid, BlogSection, HeroMarketingSection, FAQSection, CategoryTabs, } from '../../../Component'
import { Home24Regular } from '@fluentui/react-icons'
import { ServicesData } from './data'

const ServicePage = () => {
    return (
        <>
            <Box sx={{ pt: 8 }}>
                <CategoryTabs />
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
                <CategoryBanner title='Graphics Design' subtitle='Popular picks, proven results' />
                <ServicesGrid data={ServicesData} />
                <ConsultantForm />
                <AIServicesShowcase />
                <BlogSection />
                <HeroMarketingSection />
                <FAQSection />
            </Box>
        </>
    )
}

export default ServicePage
