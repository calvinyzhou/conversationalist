'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { sampleEvents, sampleUsers } from '@/data/sampleData';
import MapWrapper from '@/components/MapWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Map() {
  const { events, users } = useStore();

  useEffect(() => {
    // Initialize store with sample data if not already loaded
    if (events.length === 0) {
      useStore.setState({ events: sampleEvents, users: sampleUsers });
    }
  }, [events.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mt-5 mb-4">
            Discover Events & Connect <span className="gradient-text">🌎</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-2">
            Explore upcoming events, workshops, and connect with members in your area.
            Click on markers to see event details or user density areas.
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            Use the search bar above the map to zoom to any major US city.
          </p>
        </div>

        <div className="mb-8 bg-white p-4 sm:p-6 rounded-lg shadow-md overflow-hidden">
          <MapWrapper />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-black mb-4">
              Event Markers
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Blue pins show upcoming events, workshops, and meetups. Click on any marker to see details and register.
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-black mb-4">
              User Density Areas
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Blue circles show areas with high member density. Larger circles indicate more members in that area.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

