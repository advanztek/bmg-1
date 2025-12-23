import React from 'react'
import { AIServicesSection, LetsWorkTogether, AIServicesShowcase, BlogSection, CategoriesSection, ConsultantForm, FAQSection, HeroMarketingSection, HowBMGWorks, PortfolioMarquee, ServiceSlider, TestimonialsSection, TrendingService } from '../../../Component'
import AIVideoGeneratorHome from '../../../Component/AIVideoGen'
import AIVideoEditorHome from '../../../Component/AIVideoEditor'
import AIBusinessStrategyHome from '../../../Component/AIBuzStrategy'
// import AIWebGeneratorHome from '../../../Component/AIWebGen'

const HomePage = () => {
  return (
    <>
      <AIServicesShowcase />
      <HowBMGWorks />
      <CategoriesSection />
      <ServiceSlider />
      <AIServicesSection />
      <HeroMarketingSection />
      <TrendingService />
      <ConsultantForm />
      <PortfolioMarquee />
      <TestimonialsSection />
      <FAQSection />
      <LetsWorkTogether />
    </>
  )
}

export default HomePage
