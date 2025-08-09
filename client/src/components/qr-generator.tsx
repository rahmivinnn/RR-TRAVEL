import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Download } from "lucide-react";

interface QRGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample QR codes for demo purposes
const qrCodeDataUrls = {
  "BALI001": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNHB4IiBmaWxsPSJibGFjayI+QkFMSTAwMTwvdGV4dD4KPC9zdmc+",
  "YOGYA002": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNHB4IiBmaWxsPSJibGFjayI+WU9HWUEwMDI8L3RleHQ+Cjwvc3ZnPg==",
  "LOMBOK003": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNHB4IiBmaWxsPSJibGFjayI+TE9NQk9LMDAzPC90ZXh0Pgo8L3N2Zz4=",
  "RAJAAMPAT004": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMHB4IiBmaWxsPSJibGFjayI+UkFKQUFNUEFUMDA0PC90ZXh0Pgo8L3N2Zz4="
};

const packageNames = {
  "BALI001": "Paket Bali Premium",
  "YOGYA002": "Yogyakarta Heritage",
  "LOMBOK003": "Lombok Adventure",
  "RAJAAMPAT004": "Raja Ampat Diving"
};

export default function QRGenerator({ isOpen, onClose }: QRGeneratorProps) {
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const downloadQR = (code: string) => {
    const link = document.createElement('a');
    link.href = qrCodeDataUrls[code as keyof typeof qrCodeDataUrls];
    link.download = `QR_${code}.svg`;
    link.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-green-600" />
            QR Code Paket Wisata Demo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            Download QR code demo untuk menguji fitur scanner
          </p>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(packageNames).map(([code, name]) => (
              <Card key={code} className="border-gray-200 hover:border-green-300 transition-colors cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="mb-3">
                    <img 
                      src={qrCodeDataUrls[code as keyof typeof qrCodeDataUrls]} 
                      alt={`QR ${code}`}
                      className="w-20 h-20 mx-auto border border-gray-200 rounded"
                    />
                  </div>
                  <div className="text-xs font-medium text-gray-800 mb-1">{code}</div>
                  <div className="text-xs text-gray-600 mb-2">{name}</div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadQR(code)}
                    className="w-full text-xs"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-700 text-xs leading-relaxed">
              <strong>Cara penggunaan:</strong><br/>
              1. Download salah satu QR code di atas<br/>
              2. Tampilkan di layar lain atau cetak<br/>
              3. Klik "Scan QR" di header website<br/>
              4. Arahkan kamera ke QR code untuk melihat detail paket wisata
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}