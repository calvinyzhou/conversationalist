'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { sampleEvents } from '@/data/sampleData';
import { Event } from '@/types';
import { format } from 'date-fns';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EventDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { events, registerForEvent, currentUser } = useStore();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (events.length === 0) {
      useStore.setState({ events: sampleEvents });
    }
  }, [events.length]);

  useEffect(() => {
    const eventId = params?.id as string;
    const foundEvent = events.find((e) => e.id === eventId) || 
                      sampleEvents.find((e) => e.id === eventId);
    setEvent(foundEvent || null);
  }, [params?.id, events]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dark-blue mb-4">Event not found</h1>
          <Link href="/events" className="text-accent-blue hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const handleRegister = () => {
    // Demo mode: create a demo user if needed
    let userId = currentUser?.id;
    if (!userId) {
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

    if (event.registeredUsers.length >= event.capacity) {
      alert('This event is at full capacity');
      return;
    }

    if (event.registeredUsers.includes(userId)) {
      alert('You are already registered for this event');
      return;
    }

    registerForEvent(event.id, userId);
    alert('Successfully registered for event!');
  };

  const isRegistered = currentUser && event.registeredUsers.includes(currentUser.id);
  const isFull = event.registeredUsers.length >= event.capacity;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/events"
          className="text-tc-blue font-bold hover:text-tc-purple transition-colors mb-6 inline-block"
        >
          ← Back to Events
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-tc-yellow text-black rounded-full font-bold">
                {event.type}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
              {event.title}
            </h1>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="font-bold text-black mb-2">📅 Date & Time</h2>
                <p className="text-gray-700">
                  {format(event.date, 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="text-gray-700">{event.time}</p>
              </div>

              <div>
                <h2 className="font-bold text-black mb-2">📍 Location</h2>
                <p className="text-gray-700">{event.location.name}</p>
                <p className="text-gray-600 text-sm">{event.location.area}, {event.location.city}, {event.location.state}</p>
              </div>

              <div>
                <h2 className="font-bold text-black mb-2">👤 Facilitator</h2>
                <p className="text-gray-700">{event.facilitator}</p>
              </div>

              <div>
                <h2 className="font-bold text-black mb-2">👥 Capacity</h2>
                <p className="text-gray-700">
                  {event.registeredUsers.length} / {event.capacity} registered
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-tc-yellow h-2 rounded-full"
                    style={{
                      width: `${(event.registeredUsers.length / event.capacity) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                About This Event
              </h2>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                Learning Objectives
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {event.learningObjectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t pt-8">
              <button
                onClick={handleRegister}
                disabled={isFull || isRegistered || !currentUser}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform ${
                isRegistered
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed transform-none'
                  : isFull
                  ? 'bg-red-200 text-red-800 cursor-not-allowed transform-none'
                  : 'bg-tc-yellow text-black hover:bg-yellow-400 hover:scale-105 shadow-md'
              }`}
              >
                {isRegistered
                  ? '✓ Already Registered'
                  : isFull
                  ? 'Event Full'
                  : currentUser
                  ? 'Register for This Event'
                  : 'Sign In to Register'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

