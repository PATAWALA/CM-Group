import HeroSection from '../components/sections/HeroSection';
import ServicesGrid from '../components/sections/ServicesGrid';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import CTASection from '../components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <FeaturedProducts />
      <CTASection />
    </>
  );
}