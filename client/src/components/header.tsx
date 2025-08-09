import { useState, useEffect } from "react";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImage from "@assets/ChatGPT Image Aug 9, 2025, 11_33_24 AM_1754716649787.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={logoImage} 
              alt="RR Travel Logo" 
              className="w-12 h-12 object-contain"
            />
            <span className="text-2xl font-bold text-dark-forest">RR Travel</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Input 
                type="text" 
                placeholder="Cari destinasi, paket wisata..." 
                className="w-full pl-10 border-gray-300 rounded-default focus:ring-2 focus:ring-primary-green focus:border-transparent"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            <Button className="bg-primary-green text-white px-6 ml-2 rounded-default hover:bg-green-600 transition-colors">
              Cari
            </Button>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-dark-forest hover:text-primary-green font-medium transition-colors"
            >
              Beranda
            </button>
            <button 
              onClick={() => scrollToSection('packages')} 
              className="text-dark-forest hover:text-primary-green font-medium transition-colors"
            >
              Paket Wisata
            </button>
            <button 
              onClick={() => scrollToSection('destinations')} 
              className="text-dark-forest hover:text-primary-green font-medium transition-colors"
            >
              Destinasi
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-dark-forest hover:text-primary-green font-medium transition-colors"
            >
              Tentang Kami
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-dark-forest hover:text-primary-green font-medium transition-colors"
            >
              Kontak
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="lg:hidden text-dark-forest"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-2">
              {/* Mobile Search */}
              <div className="flex mb-4">
                <Input 
                  type="text" 
                  placeholder="Cari destinasi..." 
                  className="flex-1 border-gray-300 rounded-l-default focus:ring-2 focus:ring-primary-green focus:border-transparent"
                />
                <Button className="bg-primary-green text-white px-4 rounded-r-default hover:bg-green-600 transition-colors">
                  Cari
                </Button>
              </div>
              
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="block w-full text-left py-3 px-2 text-dark-forest hover:text-primary-green hover:bg-gray-50 font-medium transition-colors rounded-lg"
                >
                  Beranda
                </button>
                <button 
                  onClick={() => scrollToSection('packages')} 
                  className="block w-full text-left py-3 px-2 text-dark-forest hover:text-primary-green hover:bg-gray-50 font-medium transition-colors rounded-lg"
                >
                  Paket Wisata
                </button>
                <button 
                  onClick={() => scrollToSection('destinations')} 
                  className="block w-full text-left py-3 px-2 text-dark-forest hover:text-primary-green hover:bg-gray-50 font-medium transition-colors rounded-lg"
                >
                  Destinasi
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="block w-full text-left py-3 px-2 text-dark-forest hover:text-primary-green hover:bg-gray-50 font-medium transition-colors rounded-lg"
                >
                  Tentang Kami
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="block w-full text-left py-3 px-2 text-dark-forest hover:text-primary-green hover:bg-gray-50 font-medium transition-colors rounded-lg"
                >
                  Kontak
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
