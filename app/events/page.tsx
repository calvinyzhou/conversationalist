'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { sampleEvents } from '@/data/sampleData';
import { Event, EventType } from '@/types';
import Link from 'next/link';
import { format } from 'date-fns';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EventsPage() {
  const { events, registerForEvent, currentUser } = useStore();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (events.length === 0) {
      useStore.setState({ events: sampleEvents });
    }
  }, [events.length]);

  useEffect(() => {
    let filtered = events;

    if (selectedType !== 'all') {
      filtered = filtered.filter((event) => event.type === selectedType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.city.toLowerCase().includes(query) ||
          event.location.state.toLowerCase().includes(query) ||
          event.location.area.toLowerCase().includes(query) ||
          event.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort by date
    filtered = [...filtered].sort((a: Event, b: Event) => a.date.getTime() - b.date.getTime());

    setFilteredEvents(filtered);
  }, [events, selectedType, searchQuery]);

  const handleRegister = (eventId: string) => {
    // Demo mode: create a demo user if needed
    let userId = currentUser?.id;
    if (!userId) {
      // Create a temporary demo user ID
      userId = `demo-user-${Date.now()}`;
      useStore.setState({
        currentUser: {
          id: userId,
          email: 'demo@example.com',
          displayName: 'Demo User',
          location: { city: 'Philadelphia', state: 'PA', area: 'Center City', coordinates: [39.9526, -75.1652] },
          interests: [],
          traits: { communicationStyle: '', personalityType: '' },
          skills: [],
          availability: { weekdays: false, weekends: false, times: [] },
          privacy: { showLocation: true, showInterests: true, showTraits: true },
        },
      });
    }

    const event = events.find((e) => e.id === eventId);
    if (event && event.registeredUsers.length >= event.capacity) {
      alert('This event is at full capacity');
      return;
    }

    if (event && event.registeredUsers.includes(userId)) {
      alert('You are already registered for this event');
      return;
    }

    registerForEvent(eventId, userId);
    alert('Successfully registered for event!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mt-5 mb-4">
            Events & Workshops <span className="gradient-text">🎬</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700">
            Join workshops, conventions, and practice sessions to improve your communication skills.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as EventType | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
            >
              <option value="all">All Types</option>
              <option value="workshop">Workshops</option>
              <option value="convention">Conventions</option>
              <option value="group-session">Group Sessions</option>
              <option value="meetup">Meetups</option>
            </select>
          </div>
        </div>

        {/* Events List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-600">
              No events found matching your criteria.
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-tc-yellow text-black rounded-full text-sm font-bold">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold mr-2">📅</span>
                      {format(event.date, 'MMMM d, yyyy')} at {event.time}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold mr-2">📍</span>
                      {event.location.name}, {event.location.city}, {event.location.state}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold mr-2">👤</span>
                      {event.facilitator}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold mr-2">👥</span>
                      {event.registeredUsers.length} / {event.capacity} registered
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/events/${event.id}`}
                      className="flex-1 text-center px-4 py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-md"
                    >
                      Learn More
                    </Link>
                    <button
                      onClick={() => handleRegister(event.id)}
                      disabled={
                        event.registeredUsers.some((id: string) => id.startsWith('demo-user') && currentUser?.id === id) ||
                        event.registeredUsers.length >= event.capacity
                      }
                      className="flex-1 px-4 py-2 bg-tc-yellow text-black rounded-lg font-bold hover:bg-yellow-400 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md"
                    >
                      {event.registeredUsers.some((id: string) => id === currentUser?.id)
                        ? 'Registered'
                        : event.registeredUsers.length >= event.capacity
                        ? 'Full'
                        : 'Register'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
