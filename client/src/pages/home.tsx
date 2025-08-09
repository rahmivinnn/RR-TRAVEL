import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturedPackages from "@/components/featured-packages";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import TestimonialsSection from "@/components/testimonials-section";
import MapSection from "@/components/map-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <FeaturedPackages />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <MapSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
