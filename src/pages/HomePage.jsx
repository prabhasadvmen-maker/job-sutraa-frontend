import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedJobs from '../components/FeaturedJobs';
import LatestProjects from '../components/LatestProjects';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import TrustBanner from '../components/TrustBanner';

export const HomePage = () => {
  return (
    <div className="homepage-content-wrapper">
      <Hero />
      <StatsSection />
      <CategoriesSection />
      <FeaturedJobs />
      <LatestProjects />
      <WhyChooseUs />
      <HowItWorks />
      <TrustBanner />
    </div>
  );
};

export default HomePage;
