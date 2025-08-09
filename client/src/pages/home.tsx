import { useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturedPackages from "@/components/featured-packages";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import TestimonialsSection from "@/components/testimonials-section";
import MapSection from "@/components/map-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import QRGenerator from "@/components/qr-generator";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Home() {
  const [isQRGeneratorOpen, setIsQRGeneratorOpen] = useState(false);

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
      
      {/* Floating QR Demo Button */}
      <Button
        onClick={() => setIsQRGeneratorOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full p-4"
        title="Download QR Code Demo"
      >
        <Download className="h-5 w-5" />
      </Button>

      {/* QR Generator Dialog */}
      <QRGenerator 
        isOpen={isQRGeneratorOpen}
        onClose={() => setIsQRGeneratorOpen(false)}
      />
    </div>
  );
}
