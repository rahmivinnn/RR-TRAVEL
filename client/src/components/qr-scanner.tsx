import { useState, useRef, useEffect } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Camera, X, MapPin, Clock, Star } from "lucide-react";

interface TravelPackage {
  id: string;
  name: string;
  location: string;
  price: string;
  duration: string;
  rating: number;
  description: string;
  features: string[];
  imageUrl?: string;
}

// Sample travel packages data that could be encoded in QR codes
const travelPackages: Record<string, TravelPackage> = {
  "BALI001": {
    id: "BALI001",
    name: "Paket Wisata Bali Premium",
    location: "Bali, Indonesia",
    price: "Rp 3.500.000",
    duration: "4 Hari 3 Malam",
    rating: 4.8,
    description: "Nikmati keindahan Bali dengan paket wisata premium yang mencakup kunjungan ke tempat-tempat iconic seperti Tanah Lot, Uluwatu, dan Ubud.",
    features: ["Hotel Bintang 4", "Transportasi AC", "Guide Profesional", "Makan 3x Sehari", "Tiket Masuk Wisata"]
  },
  "YOGYA002": {
    id: "YOGYA002",
    name: "Yogyakarta Heritage Tour",
    location: "Yogyakarta, Indonesia",
    price: "Rp 2.200.000",
    duration: "3 Hari 2 Malam",
    rating: 4.7,
    description: "Jelajahi kekayaan budaya dan sejarah Yogyakarta dengan mengunjungi Candi Borobudur, Prambanan, Kraton, dan Malioboro.",
    features: ["Hotel Heritage", "Transportasi Pribadi", "Guide Lokal", "Breakfast", "Tiket Candi"]
  },
  "LOMBOK003": {
    id: "LOMBOK003",
    name: "Lombok Adventure Package",
    location: "Lombok, NTB",
    price: "Rp 4.100.000",
    duration: "5 Hari 4 Malam",
    rating: 4.9,
    description: "Petualangan seru di Lombok dengan trekking Gunung Rinjani, snorkeling di Gili Trawangan, dan menikmati pantai-pantai eksotis.",
    features: ["Resort Tepi Pantai", "Peralatan Snorkeling", "Guide Pendaki", "All Meals", "Boat Transfer"]
  },
  "RAJAAMPAT004": {
    id: "RAJAAMPAT004",
    name: "Raja Ampat Diving Experience",
    location: "Raja Ampat, Papua Barat",
    price: "Rp 8.500.000",
    duration: "6 Hari 5 Malam",
    rating: 5.0,
    description: "Eksplorasi bawah laut terbaik dunia di Raja Ampat dengan diving di spot-spot terbaik dan menikmati keindahan alam yang masih pristine.",
    features: ["Liveaboard Premium", "Diving Equipment", "Certified Divemaster", "Full Board", "Airport Transfer"]
  }
};

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QRScanner({ isOpen, onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedPackage, setScannedPackage] = useState<TravelPackage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (isOpen && isScanning && !scannerRef.current) {
      startScanning();
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [isOpen, isScanning]);

  const startScanning = () => {
    try {
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      };

      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        config,
        false
      );

      scannerRef.current.render(
        (decodedText: string) => {
          // Success callback
          handleScanSuccess(decodedText);
        },
        (error: any) => {
          // Error callback - we can ignore most errors as they're just "no QR found"
          console.debug("QR Scan error:", error);
        }
      );
    } catch (err) {
      setError("Gagal memulai kamera. Pastikan browser Anda mendukung akses kamera.");
      console.error("Scanner initialization error:", err);
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    console.log("QR Code scanned:", decodedText);
    
    // Stop scanning
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
    setIsScanning(false);

    // Check if the scanned code matches our travel packages
    const packageData = travelPackages[decodedText.toUpperCase()];
    
    if (packageData) {
      setScannedPackage(packageData);
      setError(null);
    } else {
      setError(`QR Code "${decodedText}" tidak dikenali sebagai paket wisata RR Travel. Silakan scan QR code yang valid.`);
    }
  };

  const handleStartScanning = () => {
    setIsScanning(true);
    setError(null);
    setScannedPackage(null);
  };

  const handleClose = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
    setIsScanning(false);
    setScannedPackage(null);
    setError(null);
    onClose();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-green-600" />
            Scan QR Code Paket Wisata
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 p-2"
            onClick={handleClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          {!isScanning && !scannedPackage && !error && (
            <div className="text-center py-6">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Scan QR code untuk melihat detail paket wisata RR Travel
              </p>
              <Button onClick={handleStartScanning} className="bg-green-600 hover:bg-green-700">
                <QrCode className="w-4 h-4 mr-2" />
                Mulai Scan
              </Button>
            </div>
          )}

          {isScanning && (
            <div className="space-y-4">
              <div id="qr-reader" className="w-full"></div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Arahkan kamera ke QR code paket wisata
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (scannerRef.current) {
                      scannerRef.current.clear().catch(console.error);
                      scannerRef.current = null;
                    }
                    setIsScanning(false);
                  }}
                >
                  Batal
                </Button>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
              <Button onClick={handleStartScanning} variant="outline">
                Coba Lagi
              </Button>
            </div>
          )}

          {scannedPackage && (
            <Card className="border-green-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-green-700 mb-1">
                      {scannedPackage.name}
                    </CardTitle>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {scannedPackage.location}
                    </div>
                    {renderStars(scannedPackage.rating)}
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {scannedPackage.id}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{scannedPackage.duration}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {scannedPackage.price}
                    </div>
                    <div className="text-xs text-gray-500">per orang</div>
                  </div>
                </div>

                <div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {scannedPackage.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Yang Termasuk:</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {scannedPackage.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Pesan Sekarang
                  </Button>
                  <Button variant="outline" onClick={handleStartScanning}>
                    Scan Lagi
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Demo QR codes info */}
          {!isScanning && !scannedPackage && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">QR Code Demo:</h4>
              <p className="text-blue-700 text-sm mb-2">Coba scan QR code dengan kode:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded border">
                  <strong>BALI001</strong><br/>
                  Paket Bali Premium
                </div>
                <div className="bg-white p-2 rounded border">
                  <strong>YOGYA002</strong><br/>
                  Yogyakarta Heritage
                </div>
                <div className="bg-white p-2 rounded border">
                  <strong>LOMBOK003</strong><br/>
                  Lombok Adventure
                </div>
                <div className="bg-white p-2 rounded border">
                  <strong>RAJAAMPAT004</strong><br/>
                  Raja Ampat Diving
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}