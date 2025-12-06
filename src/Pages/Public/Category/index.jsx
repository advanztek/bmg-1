import React from 'react'
import { Box, Typography } from '@mui/material'
import { AIServicesShowcase, FAQSection, BlogSection, BreadcrumbBar, CategoryBanner, CategoryTabs, ConsultantForm, ServiceCategoryExplorer } from '../../../Component'
import { Home24Regular } from '@fluentui/react-icons'

const CategoryPage = () => {
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
      <CategoryBanner title='Explore Our Categories' subtitle='Popular picks, proven results' />
      <ServiceCategoryExplorer />
      <ConsultantForm />
      <AIServicesShowcase />
      <BlogSection />
      <FAQSection />
      </Box>
    </>
  )
}

export default CategoryPage
