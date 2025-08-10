import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import CEOSection from "@/components/ceo-section";
import FeaturedPackages from "@/components/featured-packages-new";
import ServicesSection from "@/components/services-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <CEOSection />
      <FeaturedPackages />
      <ServicesSection />
      <Footer />
    </div>
  );
}
