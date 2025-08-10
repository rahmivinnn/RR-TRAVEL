import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, Linkedin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animated-section";
import founderImage from "@assets/IMG_20250506_100848-removebg-preview_1754716476473.png";

export default function CEOSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeUp" className="text-center mb-8 sm:mb-12 lg:mb-16">
          <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-4">
            Pimpinan Perusahaan
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Meet Our Founder & CEO</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Dipimpin oleh visioner yang berpengalaman dalam industri pariwisata Indonesia
          </p>
        </AnimatedSection>

        <AnimatedSection animation="scaleUp" delay={0.3} className="max-w-5xl mx-auto">
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-6 sm:p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Foto CEO */}
                <AnimatedSection animation="slideLeft" delay={0.5} className="text-center lg:text-left">
                  <div className="relative inline-block">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={founderImage}
                      alt="Reza Pahlawan - Founder & CEO RR Travel"
                      className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-cover rounded-2xl shadow-2xl mx-auto lg:mx-0"
                    />
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="absolute -bottom-3 -right-3 bg-green-600 text-white p-3 rounded-full shadow-lg"
                    >
                      <Quote className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  </div>
                </AnimatedSection>

                {/* Informasi CEO */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      Reza Pahlawan
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-green-600 text-white px-3 py-1">Founder & CEO</Badge>
                      <Badge className="bg-blue-600 text-white px-3 py-1">Travel Expert</Badge>
                    </div>
                  </div>

                  <blockquote className="text-lg md:text-xl text-gray-700 italic leading-relaxed border-l-4 border-green-600 pl-4">
                    "Kami berkomitmen untuk memberikan pengalaman wisata terbaik yang tak terlupakan. 
                    Setiap perjalanan adalah kesempatan untuk menciptakan kenangan indah dan memperkaya 
                    wawasan tentang keindahan Indonesia."
                  </blockquote>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-3 text-green-600" />
                      <span>reza@rrtravel.com</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-5 h-5 mr-3 text-green-600" />
                      <span>+62 821-1566-5661</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Linkedin className="w-5 h-5 mr-3 text-green-600" />
                      <span>Reza Pahlawan</span>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Pengalaman & Prestasi</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 5 tahun pengalaman di industri pariwisata Indonesia</li>
                      <li>• Telah mengorganisir 500+ trip ke seluruh Nusantara</li>
                      <li>• Penghargaan "Best Travel Organizer" 2023</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Visi Misi */}
        <AnimatedSection animation="fadeUp" delay={0.7} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12 max-w-5xl mx-auto">
          <AnimatedSection animation="slideLeft" delay={0.9}>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">V</span>
                  </div>
                  Visi Kami
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi perusahaan tour & travel terdepan di Indonesia yang memberikan 
                  pengalaman wisata berkualitas tinggi dan berkesan bagi setiap pelanggan.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection animation="slideRight" delay={1.1}>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  Misi Kami
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Menghadirkan paket wisata inovatif dengan pelayanan prima, 
                  harga terjangkau, dan komitmen terhadap kelestarian alam Indonesia.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </section>
  );
}