'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import MapSearch from './MapSearch';
import { usCenter } from '@/data/sampleData';

// Dynamically import Map component to avoid SSR issues
const MapComponent = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[750px] w-full bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">Loading map...</p>
      </div>
  ),
});

export default function MapWrapper() {
  const [mapCenter, setMapCenter] = useState<[number, number]>(usCenter);
  const [mapZoom, setMapZoom] = useState(5);

  useEffect(() => {
    // Ensure Leaflet CSS is loaded
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      if (!document.querySelector('link[href*="leaflet"]')) {
        document.head.appendChild(link);
      }
    }
  }, []);

  const handleCitySelect = (coordinates: [number, number], zoom: number) => {
    setMapCenter(coordinates);
    setMapZoom(zoom);
  };

  return (
    <div className="w-full">
      <MapSearch onCitySelect={handleCitySelect} />
      <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[750px] w-full rounded-lg overflow-hidden shadow-lg relative" style={{ zIndex: 0 }}>
        <MapComponent searchCenter={mapCenter} searchZoom={mapZoom} />
      </div>
    </div>
  );
}