import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

interface MapSectionProps {
  showOfficeLocation?: boolean;
}

export default function MapSection({ showOfficeLocation = true }: MapSectionProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Office location coordinates (Jakarta area - Jl. Siti Mariah)
  const officeLocation: [number, number] = [106.8456, -6.2088]; // Approximate Jakarta coordinates

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    const initializeMap = async () => {
      try {
        // Fetch configuration from API
        const response = await fetch('/api/config');
        const config = await response.json();
        const mapboxToken = config.mapboxToken;

        if (!mapboxToken) {
          console.error('Mapbox token not available');
          return;
        }

        mapboxgl.accessToken = mapboxToken;

        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: officeLocation,
          zoom: 12,
          attributionControl: false,
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add office marker if requested
        if (showOfficeLocation) {
          new mapboxgl.Marker({
            color: '#5da96a', // Primary green color
            scale: 1.2
          })
            .setLngLat(officeLocation)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                '<div class="p-2"><h3 class="font-bold text-green-700">RR Travel</h3><p class="text-sm">Jl. Siti Mariah<br/>Jakarta, Indonesia</p></div>'
              )
            )
            .addTo(map.current);
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [showOfficeLocation]);

  const searchLocation = async () => {
    if (!searchQuery.trim() || !map.current) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${mapboxgl.accessToken}&country=ID&limit=5`
      );

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const [lng, lat] = feature.center;

        // Fly to the searched location
        map.current.flyTo({
          center: [lng, lat],
          zoom: 14,
          duration: 2000
        });

        // Remove existing search markers
        const existingMarkers = document.querySelectorAll('.search-marker');
        existingMarkers.forEach(marker => marker.remove());

        // Add a marker for the searched location
        if (map.current) {
          const marker = new mapboxgl.Marker({
            color: '#dc2626', // Red color for search results
            className: 'search-marker'
          })
            .setLngLat([lng, lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<div class="p-2"><h3 class="font-bold text-red-600">Lokasi Pencarian</h3><p class="text-sm">${feature.place_name}</p></div>`
              )
            )
            .addTo(map.current);

          // Open the popup
          const popup = marker.getPopup();
          if (popup) {
            popup.addTo(map.current);
          }
        }
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchLocation();
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-dark-forest mb-4">Lokasi & Peta Destinasi</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan lokasi kantor kami dan cari destinasi wisata impian Anda di peta interaktif
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Cari destinasi wisata... (contoh: Bali, Yogyakarta, Lombok)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 border-gray-300 rounded-default focus:ring-2 focus:ring-primary-green focus:border-transparent"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            <Button
              onClick={searchLocation}
              disabled={isLoading || !searchQuery.trim()}
              className="bg-primary-green text-white px-6 rounded-default hover:bg-green-600 transition-colors"
            >
              {isLoading ? 'Mencari...' : 'Cari'}
            </Button>
          </div>
        </div>

        {/* Map Container */}
        <div className="w-full h-96 md:h-[500px] rounded-default overflow-hidden shadow-lg border border-gray-200">
          <div ref={mapContainer} className="w-full h-full" />
        </div>

        {/* Office Location Info */}
        {showOfficeLocation && (
          <div className="mt-8 bg-gray-50 rounded-default p-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary-green text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark-forest mb-2">Kantor RR Travel</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Alamat:</strong> Jl. Siti Mariah, Jakarta, Indonesia
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Telepon:</strong> 082115665661
                </p>
                <p className="text-sm text-gray-500">
                  Klik marker hijau di peta untuk melihat lokasi kantor kami
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}