import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, Clock, Users, MapPin, Camera, Utensils, Car, X, CreditCard } from "lucide-react";
import type { TravelPackage } from "@shared/schema";

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
    color: "bg-primary-green",
    longDescription: "Rasakan pengalaman tak terlupakan di Pulau Dewata dengan paket wisata yang menggabungkan keindahan alam dan kekayaan budaya Bali. Kunjungi sawah terasering Jatiluwih yang menakjubkan, saksi Pura Tanah Lot saat matahari terbenam, dan nikmati pertunjukan tari tradisional di Ubud.",
    highlights: ["Sawah Terasering Jatiluwih", "Pura Tanah Lot", "Ubud Monkey Forest", "Pasar Seni Sukawati", "Pertunjukan Tari Kecak"],
    includes: ["Hotel bintang 4", "Transportasi AC", "Makan 6x", "Guide profesional", "Tiket masuk wisata"],
    maxCapacity: 20,
    gallery: [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400",
      "https://images.unsplash.com/photo-1555400113-f9031b67b441?w=400"
    ]
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
    color: "bg-warm-brown",
    longDescription: "Nikmati perjalanan sejarah dan budaya di kota istimewa Yogyakarta. Jelajahi kemegahan Candi Borobudur dan Prambanan, rasakan kehidupan kerajaan di Kraton Sultan, dan manjakan lidah dengan kuliner khas seperti Gudeg Yu Djum yang legendaris.",
    highlights: ["Candi Borobudur Sunrise", "Candi Prambanan", "Keraton Yogyakarta", "Jalan Malioboro", "Taman Sari", "Kuliner Gudeg"],
    includes: ["Hotel heritage", "Transportasi pribadi", "Makan 9x", "Guide sejarah", "Tiket candi", "Workshop batik"],
    maxCapacity: 15,
    gallery: [
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400"
    ]
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
    color: "bg-blue-500",
    longDescription: "Temukan surga tersembunyi di Lombok dengan kombinasi sempurna antara petualangan dan relaksasi. Jelajahi pantai-pantai eksotis, nikmati snorkeling di Gili Trawangan, dan tantang diri dengan pendakian Gunung Rinjani yang menakjubkan.",
    highlights: ["Pantai Senggigi", "Gili Trawangan", "Trekking Rinjani", "Air Terjun Sekumpul", "Desa Sade", "Pantai Kuta Lombok"],
    includes: ["Resort tepi pantai", "Speedboat Gili", "Peralatan snorkeling", "Guide trekking", "Makan 12x", "Perlengkapan camping"],
    maxCapacity: 12,
    gallery: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
      "https://images.unsplash.com/photo-1566142475016-16e88ac35de7?w=400"
    ]
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
    color: "bg-teal-500",
    longDescription: "Rasakan pengalaman diving terbaik di dunia di Raja Ampat, Papua Barat. Dengan 75% spesies ikan dunia dan terumbu karang yang masih pristine, Raja Ampat adalah surga bagi para pecinta bawah laut dan underwater photography.",
    highlights: ["Diving Pianemo", "Cape Kri", "Arborek Village", "Piaynemo Mushroom Rock", "Underwater Photography", "Manta Ray Cleaning Station"],
    includes: ["Liveaboard premium", "Full diving equipment", "Certified divemaster", "Underwater camera", "Full board meals", "Airport transfer Sorong"],
    maxCapacity: 8,
    gallery: [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
      "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=400"
    ]
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
    color: "bg-purple-500",
    longDescription: "Jelajahi kekayaan budaya Pulau Jawa dari Jakarta hingga Solo. Rasakan perkembangan sejarah Indonesia melalui museum, istana kerajaan, kampung batik, dan kuliner tradisional yang otentik di setiap kota.",
    highlights: ["Monas Jakarta", "Factory Outlet Bandung", "Candi Borobudur", "Keraton Solo", "Museum Batik", "Kuliner Street Food"],
    includes: ["Hotel bintang 4", "Kereta eksekutif", "Bus pariwisata", "Guide lokal", "Makan 18x", "Workshop batik"],
    maxCapacity: 25,
    gallery: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400",
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
    ]
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
    color: "bg-orange-500",
    longDescription: "Tantang adrenalin dengan petualangan trekking di Jawa Timur. Saksikan sunrise dari puncak Bromo, jelajahi keindahan air terjun Tumpak Sewu, dan nikmati blue fire phenomenon di kawah Ijen yang spektakuler.",
    highlights: ["Sunrise Mount Bromo", "Tumpak Sewu Waterfall", "Ijen Blue Fire", "Whispering Sand", "Cemoro Lawang", "Traditional Village"],
    includes: ["Mountain lodge", "Jeep 4WD", "Trekking equipment", "Professional guide", "Makan 9x", "Gas mask Ijen"],
    maxCapacity: 16,
    gallery: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400"
    ]
  }
];

export default function FeaturedPackages() {
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-gray-700">{rating}</span>
      </div>
    );
  };

  const handlePackageClick = (pkg: any) => {
    setSelectedPackage(pkg);
  };

  const closeModal = () => {
    setSelectedPackage(null);
  };

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
            <Card 
              key={pkg.id} 
              className="bg-white rounded-default shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 duration-200 overflow-hidden"
              onClick={() => handlePackageClick(pkg)}
            >
              <div className="relative">
                <img 
                  src={pkg.imageUrl} 
                  alt={`${pkg.name} tour package`} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`${pkg.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {pkg.duration}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                  {renderStars(pkg.rating)}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">{pkg.location}</span>
                </div>
                <h3 className="text-xl font-bold text-dark-forest mb-2 hover:text-primary-green transition-colors">
                  {pkg.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary-green">
                      Rp {pkg.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-gray-500 text-sm">/orang</span>
                  </div>
                  <Button 
                    className="bg-primary-green text-white px-4 py-2 rounded-default hover:bg-green-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePackageClick(pkg);
                    }}
                  >
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

      {/* Package Detail Modal */}
      <Dialog open={!!selectedPackage} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {selectedPackage && (
            <>
              <DialogHeader className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 p-2"
                  onClick={closeModal}
                >
                  <X className="w-4 h-4" />
                </Button>
                <DialogTitle className="text-2xl font-bold text-dark-forest pr-10">
                  {selectedPackage.name}
                </DialogTitle>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-gray-600">{selectedPackage.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-gray-600">{selectedPackage.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-gray-600">Max {selectedPackage.maxCapacity} orang</span>
                  </div>
                  {renderStars(selectedPackage.rating)}
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={selectedPackage.imageUrl} 
                      alt={selectedPackage.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {selectedPackage.gallery && (
                    <div className="grid grid-cols-3 gap-2">
                      {selectedPackage.gallery.map((img: string, index: number) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                          <img 
                            src={img} 
                            alt={`${selectedPackage.name} ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Package Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-dark-forest mb-3">Deskripsi Paket</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedPackage.longDescription}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-dark-forest mb-3">Highlight Destinasi</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedPackage.highlights?.map((highlight: string, index: number) => (
                        <div key={index} className="flex items-center">
                          <Camera className="w-4 h-4 text-primary-green mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-dark-forest mb-3">Yang Sudah Termasuk</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedPackage.includes?.map((include: string, index: number) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-primary-green rounded-full mr-3"></div>
                          <span className="text-gray-600">{include}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold text-primary-green">
                          {formatPrice(selectedPackage.price)}
                        </div>
                        <div className="text-sm text-gray-500">per orang</div>
                      </div>
                      <Badge className={`${selectedPackage.color} text-white px-3 py-1`}>
                        {selectedPackage.duration}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-primary-green hover:bg-green-600 text-white">
                        <Car className="w-4 h-4 mr-2" />
                        Pesan Sekarang
                      </Button>
                      <Button variant="outline" className="border-primary-green text-primary-green hover:bg-primary-green hover:text-white">
                        <Utensils className="w-4 h-4 mr-2" />
                        Tanya Detail
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
