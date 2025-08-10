import { useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import CEOSection from "@/components/ceo-section";
import FeaturedPackages from "@/components/featured-packages-new";
import ServicesSection from "@/components/services-section";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturedPackages />
      <CEOSection />
      <ServicesSection />
      <MapSection />
      <Footer />
      
      {/* Floating Chatbot Button */}
      {!isChatbotOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, duration: 0.3 }}
          className="fixed bottom-4 right-4 z-40"
        >
          <Button
            onClick={() => setIsChatbotOpen(true)}
            className="w-14 h-14 rounded-full bg-primary-green hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
        </motion.div>
      )}
      
      {/* Chatbot */}
      <Chatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </div>
  );
}
