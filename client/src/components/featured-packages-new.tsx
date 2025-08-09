import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, Clock, Users, MapPin, CreditCard, X } from "lucide-react";
import type { TravelPackage } from "@shared/schema";

export default function FeaturedPackages() {
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [, setLocation] = useLocation();

  // Fetch travel packages from API
  const { data: packages, isLoading, error } = useQuery<TravelPackage[]>({
    queryKey: ["/api/packages"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

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

  const handlePackageClick = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
  };

  const handleBookNow = (packageId: string) => {
    setLocation(`/booking/${packageId}`);
  };

  const closeModal = () => {
    setSelectedPackage(null);
  };

  if (isLoading) {
    return (
      <section id="packages" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Paket Wisata Terpopuler</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pilihan paket tour terbaik dengan harga terjangkau dan pelayanan memuaskan
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="packages" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Paket Wisata Terpopuler</h2>
            <p className="text-xl text-red-600 max-w-2xl mx-auto">
              Terjadi kesalahan saat memuat paket wisata. Silakan coba lagi nanti.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!packages || packages.length === 0) {
    return (
      <section id="packages" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Paket Wisata Terpopuler</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Paket wisata akan segera tersedia. Nantikan update terbaru dari kami!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Paket Wisata Terpopuler</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pilihan paket tour terbaik dengan harga terjangkau dan pelayanan memuaskan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 duration-200 overflow-hidden"
              onClick={() => handlePackageClick(pkg)}
            >
              <div className="relative">
                <img 
                  src={pkg.imageUrl} 
                  alt={`${pkg.name} tour package`} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {pkg.duration}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                  {renderStars(pkg.rating)}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">{pkg.location}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Grup Tour</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{formatPrice(pkg.price)}</p>
                    <p className="text-sm text-gray-500">per orang</p>
                  </div>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookNow(pkg.id);
                    }}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Package Detail Modal */}
        <Dialog open={!!selectedPackage} onOpenChange={closeModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedPackage && (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                      {selectedPackage.name}
                    </DialogTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeModal}
                      className="rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Main Image */}
                  <div className="relative rounded-lg overflow-hidden">
                    <img 
                      src={selectedPackage.imageUrl}
                      alt={selectedPackage.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600 text-white px-3 py-1">
                        {selectedPackage.duration}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      {renderStars(selectedPackage.rating)}
                    </div>
                  </div>

                  {/* Package Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Detail Paket</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-gray-600">{selectedPackage.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-gray-600">{selectedPackage.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-gray-600">Grup Tour</span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Deskripsi</h4>
                        <p className="text-gray-600 leading-relaxed">
                          {selectedPackage.description}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Harga & Booking</h3>
                      <div className="bg-green-50 rounded-lg p-4 mb-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600">
                            {formatPrice(selectedPackage.price)}
                          </p>
                          <p className="text-gray-600">per orang</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3"
                          onClick={() => {
                            closeModal();
                            handleBookNow(selectedPackage.id);
                          }}
                        >
                          <CreditCard className="w-5 h-5 mr-2" />
                          Book Sekarang
                        </Button>
                        <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                          Tanya Detail via WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}