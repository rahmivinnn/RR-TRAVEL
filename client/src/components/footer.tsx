import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import logoImage from "@assets/ChatGPT Image Aug 9, 2025, 11_33_24 AM_1754716649787.png";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: "Beranda", id: "home" },
    { name: "Paket Wisata", id: "packages" },
    { name: "Destinasi", id: "destinations" },
    { name: "Tentang Kami", id: "about" },
    { name: "Kontak", id: "contact" }
  ];

  const destinations = [
    "Bali",
    "Yogyakarta", 
    "Lombok",
    "Raja Ampat",
    "Bromo Tengger"
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Youtube, href: "#" }
  ];

  return (
    <footer className="bg-dark-forest text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={logoImage} 
                alt="RR Travel Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="text-2xl font-bold">RR Travel</span>
            </div>
            <p className="text-gray-300 mb-4">
              Menyediakan pengalaman wisata terbaik di Indonesia dengan layanan professional dan terpercaya.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href} 
                    className="text-gray-300 hover:text-primary-green transition-colors"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-primary-green transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-bold mb-6">Destinasi Populer</h4>
            <ul className="space-y-3">
              {destinations.map((destination, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-primary-green transition-colors">
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Kontak</h4>
            <div className="space-y-3">
              <p className="text-gray-300 flex items-start">
                <MapPin className="w-4 h-4 mt-1 mr-3 text-primary-green flex-shrink-0" />
                Jl. Siti Mariah<br />Jakarta, Indonesia
              </p>
              <p className="text-gray-300 flex items-center">
                <Phone className="w-4 h-4 mr-3 text-primary-green" />
                082115665661
              </p>
              <p className="text-gray-300 flex items-center">
                <Mail className="w-4 h-4 mr-3 text-primary-green" />
                info@rrtravel.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 RR Travel. All rights reserved. | Designed with ❤️ for Indonesia Tourism
          </p>
        </div>
      </div>
    </footer>
  );
}
