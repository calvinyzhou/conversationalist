'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useStore } from '@/store/useStore';
import { Event } from '@/types';
import Link from 'next/link';
import { usCenter } from '@/data/sampleData';

// Fix default marker icon issue
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Component to handle map view changes
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
      duration: 1,
    });
  }, [map, center, zoom]);

  return null;
}

interface MapProps {
  searchCenter?: [number, number];
  searchZoom?: number;
}

export default function Map({ searchCenter, searchZoom }: MapProps) {
  const { events, users } = useStore();

  // US center coordinates (Kansas, roughly center of US)
  const defaultZoom = 5;

  // Use search center if provided, otherwise default
  const center = searchCenter || usCenter;
  const zoom = searchZoom || defaultZoom;

  // Group users by city/area for density visualization
  const userDensity = users.reduce((acc, user) => {
    const key = `${user.location.city}-${user.location.area}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      scrollWheelZoom={true}
      className="rounded-lg"
    >
      <MapController center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* User density visualization */}
      {Object.entries(userDensity).map(([key, count]) => {
        const user = users.find((u) => `${u.location.city}-${u.location.area}` === key);
        if (!user) return null;
        
        return (
          <CircleMarker
            key={`density-${key}`}
            center={user.location.coordinates}
            radius={Math.min(count * 8, 50)}
            pathOptions={{
              fillColor: '#4A6FA5',
              fillOpacity: 0.3,
              color: '#4A6FA5',
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>{user.location.area}</strong>
                <br />
                {user.location.city}, {user.location.state}
                <p className="text-sm text-gray-600">{count} {count === 1 ? 'member' : 'members'}</p>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}

      {/* Event markers */}
      {events.map((event: Event) => (
        <Marker
          key={event.id}
          position={event.location.coordinates}
          icon={defaultIcon}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold">{event.title}</h3>
              <p className="text-gray-600">{event.location.name}</p>
              <p className="text-gray-600">
                {event.date.toLocaleDateString()} at {event.time}
              </p>
              <p className="text-sm text-gray-700 capitalize">{event.type.replace('-', ' ')}</p>
              <Link
                href={`/events/${event.id}`}
                className="text-accent-blue font-semibold hover:underline"
              >
                View Details →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}