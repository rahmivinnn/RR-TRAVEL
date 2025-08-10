import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/animated-section";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 sm:pt-16 lg:pt-20 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <AnimatedSection animation="fadeUp" className="lg:col-span-2">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-green-400">RR Travel</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Partner terpercaya untuk menjelajahi keindahan Indonesia. Dengan pengalaman lebih dari 15 tahun, 
              kami menyediakan paket wisata berkualitas tinggi dan pelayanan prima untuk setiap perjalanan Anda.
            </p>
            
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
                className="flex items-center text-gray-300"
              >
                <MapPin className="w-5 h-5 mr-3 text-green-400" />
                <span>Jl. Siti Mariah, Bandung 40231</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
                className="flex items-center text-gray-300"
              >
                <Phone className="w-5 h-5 mr-3 text-green-400" />
                <span>+62 821-1566-5661</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
                className="flex items-center text-gray-300"
              >
                <Mail className="w-5 h-5 mr-3 text-green-400" />
                <span>info@rrtravel.com</span>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <h4 className="text-lg font-semibold mb-6 text-green-400">Menu Utama</h4>
            <ul className="space-y-3">
              {[
                { name: "Beranda", href: "#" },
                { name: "Paket Wisata", href: "#packages" },
                { name: "Tentang Kami", href: "#about" },
                { name: "Galeri", href: "#gallery" },
                { name: "Kontak", href: "#contact" }
              ].map((link) => (
                <li key={link.name}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Popular Destinations */}
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <h4 className="text-lg font-semibold mb-6 text-green-400">Destinasi Populer</h4>
            <ul className="space-y-3">
              {[
                "Bali",
                "Yogyakarta", 
                "Lombok",
                "Raja Ampat",
                "Bromo Tengger",
                "Flores"
              ].map((destination) => (
                <li key={destination}>
                  <motion.span
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 cursor-pointer block"
                  >
                    {destination}
                  </motion.span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>

        {/* Social Media & Newsletter */}
        <AnimatedSection animation="fadeUp" delay={0.6} className="mt-12 sm:mt-16 pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">Ikuti Kami</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <Facebook className="w-5 h-5" />, href: "#", name: "Facebook" },
                  { icon: <Instagram className="w-5 h-5" />, href: "#", name: "Instagram" },
                  { icon: <Twitter className="w-5 h-5" />, href: "#", name: "Twitter" }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.href}
                    className="bg-gray-800 p-3 rounded-full text-gray-300 hover:bg-green-600 hover:text-white transition-colors duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="max-w-md">
              <h4 className="text-lg font-semibold mb-4 text-green-400">Newsletter</h4>
              <p className="text-gray-300 mb-4 text-sm">
                Dapatkan update paket wisata terbaru dan penawaran spesial
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom Copyright */}
        <AnimatedSection animation="fadeUp" delay={0.8} className="mt-8 sm:mt-12 pt-6 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
            <p className="text-gray-400 text-sm">
              © 2025 RR Travel. All rights reserved. Designed with ❤️ for Indonesia
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm">
              <motion.a
                whileHover={{ y: -1 }}
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors duration-300"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                whileHover={{ y: -1 }}
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors duration-300"
              >
                Terms of Service
              </motion.a>
              <motion.a
                whileHover={{ y: -1 }}
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors duration-300"
              >
                FAQ
              </motion.a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
}