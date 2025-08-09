import { Shield, Users, DollarSign, Headphones } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Terpercaya & Aman",
    description: "Terdaftar resmi dengan standar keamanan tinggi untuk kenyamanan perjalanan Anda"
  },
  {
    icon: Users,
    title: "Guide Berpengalaman",
    description: "Tim guide lokal profesional dengan pengetahuan mendalam tentang destinasi wisata"
  },
  {
    icon: DollarSign,
    title: "Harga Terjangkau",
    description: "Paket wisata berkualitas dengan harga bersaing dan tanpa biaya tersembunyi"
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Layanan pelanggan siap membantu Anda kapan saja selama perjalanan wisata"
  }
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-forest mb-4">Mengapa Memilih RR Travel?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan pengalaman wisata terbaik dengan layanan profesional dan terpercaya
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-primary-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-dark-forest mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
