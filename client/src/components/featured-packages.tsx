import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const packages = [
  {
    id: 1,
    name: "Bali Budaya & Alam",
    description: "Jelajahi keindahan sawah terasering Jatiluwih, Pura Tanah Lot, dan budaya Bali yang autentik",
    duration: "3D2N",
    price: 2850000,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    location: "Bali",
    color: "bg-primary-green"
  },
  {
    id: 2,
    name: "Yogya Heritage Tour",
    description: "Eksplorasi Candi Borobudur, Prambanan, Keraton Yogya, dan kuliner legendaris Gudeg",
    duration: "4D3N",
    price: 1950000,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    location: "Yogyakarta",
    color: "bg-warm-brown"
  },
  {
    id: 3,
    name: "Lombok Paradise",
    description: "Nikmati keindahan Pantai Senggigi, Gili Trawangan, dan pendakian Gunung Rinjani",
    duration: "5D4N",
    price: 3450000,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    location: "Lombok",
    color: "bg-blue-500"
  },
  {
    id: 4,
    name: "Raja Ampat Diving",
    description: "Eksplorasi surga bawah laut terbaik dunia dengan keanekaragaman hayati luar biasa",
    duration: "6D5N",
    price: 8750000,
    rating: 5.0,
    imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    location: "Raja Ampat",
    color: "bg-teal-500"
  },
  {
    id: 5,
    name: "Java Cultural Journey",
    description: "Perjalanan budaya lengkap Jakarta-Bandung-Yogya-Solo dengan pengalaman autentik",
    duration: "7D6N",
    price: 4250000,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    location: "Java",
    color: "bg-purple-500"
  },
  {
    id: 6,
    name: "Adventure Trekking",
    description: "Petualangan mendaki Gunung Bromo, air terjun Tumpak Sewu, dan kawah Ijen yang memukau",
    duration: "4D3N",
    price: 2150000,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    location: "East Java",
    color: "bg-orange-500"
  }
];

export default function FeaturedPackages() {
  return (
    <section id="packages" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-forest mb-4">Paket Wisata Terpopuler</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pilihan paket tour terbaik dengan harga terjangkau dan pelayanan memuaskan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="bg-white rounded-default shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative">
                <img 
                  src={pkg.imageUrl} 
                  alt={`${pkg.name} tour package`} 
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${pkg.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {pkg.duration}
                  </Badge>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(pkg.rating) ? 'fill-current' : 'stroke-current'}`} 
                      />
                    ))}
                    <span className="text-gray-600 ml-1 text-sm">({pkg.rating})</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-dark-forest mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary-green">
                      Rp {pkg.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-gray-500 text-sm">/orang</span>
                  </div>
                  <Button className="bg-primary-green text-white px-4 py-2 rounded-default hover:bg-green-600 transition-colors">
                    Lihat Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-primary-green text-white px-8 py-3 rounded-default hover:bg-green-600 transition-colors font-semibold">
            Lihat Semua Paket
          </Button>
        </div>
      </div>
    </section>
  );
}
