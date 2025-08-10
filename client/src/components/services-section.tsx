import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, HeartHandshake, MapPin, Camera, Car, Hotel, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animated-section";

const services = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Asuransi Perjalanan",
    description: "Perlindungan penuh untuk setiap perjalanan Anda dengan asuransi terpercaya",
    features: ["Cakupan medis", "Kehilangan bagasi", "Pembatalan trip"]
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Layanan 24/7",
    description: "Tim customer service siap membantu Anda kapan saja selama perjalanan",
    features: ["WhatsApp support", "Emergency hotline", "Guide lokal"]
  },
  {
    icon: <HeartHandshake className="w-8 h-8" />,
    title: "Garansi Kepuasan",
    description: "Jaminan 100% uang kembali jika tidak puas dengan pelayanan kami",
    features: ["Money back guarantee", "Trip replacement", "Kompensasi delay"]
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Destinasi Eksklusif",
    description: "Akses ke lokasi wisata tersembunyi dan pengalaman yang tidak biasa",
    features: ["Hidden gems", "Local experiences", "Akses VIP"]
  },
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Dokumentasi Profesional",
    description: "Photographer berpengalaman untuk mengabadikan momen terbaik perjalanan",
    features: ["Professional photos", "Drone footage", "Video highlights"]
  },
  {
    icon: <Car className="w-8 h-8" />,
    title: "Transportasi Nyaman",
    description: "Kendaraan premium dengan driver berpengalaman untuk kenyamanan maksimal",
    features: ["AC bus", "Professional driver", "WiFi gratis"]
  },
  {
    icon: <Hotel className="w-8 h-8" />,
    title: "Akomodasi Terbaik",
    description: "Hotel dan resort pilihan dengan rating tinggi dan fasilitas lengkap",
    features: ["4-5 star hotels", "Prime location", "Breakfast included"]
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Jadwal Fleksibel",
    description: "Paket tour dengan jadwal yang dapat disesuaikan dengan kebutuhan Anda",
    features: ["Custom itinerary", "Date flexibility", "Group customization"]
  }
];

export default function ServicesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeUp" className="text-center mb-8 sm:mb-12 lg:mb-16">
          <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-4">
            Layanan Unggulan
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Mengapa Memilih RR Travel?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Kami berkomitmen memberikan pengalaman perjalanan terbaik dengan layanan premium dan profesional
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <AnimatedSection 
              key={index}
              animation="fadeUp"
              delay={index * 0.1}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
                  <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                    <div className="text-center mb-6">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300"
                      >
                        {service.icon}
                      </motion.div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="mt-auto">
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Call to Action */}
        <AnimatedSection animation="fadeUp" delay={0.8} className="text-center mt-12 sm:mt-16">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Siap Memulai Petualangan Anda?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Hubungi tim profesional kami sekarang untuk konsultasi gratis dan dapatkan paket wisata terbaik sesuai budget Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/6282115665661?text=Halo%20RR%20Travel%2C%20saya%20ingin%20konsultasi%20paket%20wisata"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300 text-center"
              >
                💬 Chat WhatsApp
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+6282115665661"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 text-center"
              >
                📞 Telepon Sekarang
              </motion.a>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}