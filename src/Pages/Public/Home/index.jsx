import React from 'react'
import { AIServicesSection, LetsWorkTogether, AIServicesShowcase, BlogSection, CategoriesSection, ConsultantForm, FAQSection, HeroMarketingSection, HowBMGWorks, PortfolioMarquee, ServiceSlider, TestimonialsSection, TrendingService } from '../../../Component'

const HomePage = () => {
  return (
    <>
      <HowBMGWorks />
      <CategoriesSection />
      <AIServicesShowcase />
      <ServiceSlider />
      <AIServicesSection />
      <HeroMarketingSection />
      <TrendingService />
      <ConsultantForm />
      <PortfolioMarquee />
      {/* <BlogSection /> */}
      <TestimonialsSection />
      <FAQSection />
      <LetsWorkTogether />
    </>
  )
}

export default HomePage
