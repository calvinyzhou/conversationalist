'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { usCities, usCenter } from '@/data/sampleData';

interface MapSearchProps {
  onCitySelect: (coordinates: [number, number], zoom: number) => void;
}

export default function MapSearch({ onCitySelect }: MapSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return usCities.filter(
      (city) =>
        city.city.toLowerCase().includes(query) ||
        city.state.toLowerCase().includes(query) ||
        `${city.city}, ${city.state}`.toLowerCase().includes(query)
    ).slice(0, 10); // Limit to 10 suggestions
  }, [searchQuery]);

  const handleCitySelect = (city: typeof usCities[0]) => {
    setSearchQuery(`${city.city}, ${city.state}`);
    setShowSuggestions(false);
    onCitySelect(city.center as [number, number], 12);
  };

  const handleReset = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    onCitySelect(usCenter, 5); // Reset to US center
  };

  return (
    <div ref={searchRef} className="relative mb-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a city (e.g., Philadelphia, New York, Los Angeles)..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={handleReset}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            title="Reset to US view"
          >
            Reset
          </button>
        )}
      </div>

      {showSuggestions && filteredCities.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredCities.map((city) => (
            <button
              key={`${city.city}-${city.state}`}
              onClick={() => handleCitySelect(city)}
              className="w-full text-left px-4 py-2 hover:bg-peachy-gold hover:bg-opacity-20 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="font-semibold text-dark-blue">{city.city}</div>
              <div className="text-sm text-gray-600">{city.state}</div>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && searchQuery && filteredCities.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <p className="text-gray-600 text-sm">No cities found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
